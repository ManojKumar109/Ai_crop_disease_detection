import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, LogOut, Leaf, History, Loader2 } from "lucide-react";
import { User, Session } from "@supabase/supabase-js";

interface DetectionResult {
  isHealthy: boolean;
  diseaseName: string;
  confidence: number;
  remedy: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        setSelectedImage(base64Image);

        // Upload to storage
        const fileExt = file.name.split(".").pop();
        const fileName = `${user?.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("leaf-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("leaf-images")
          .getPublicUrl(fileName);

        // Analyze with AI
        setAnalyzing(true);
        const { data: detectionData, error: detectionError } = await supabase.functions.invoke(
          "detect-disease",
          {
            body: { imageData: base64Image },
          }
        );

        if (detectionError) throw detectionError;

        setResult(detectionData);

        // Save to database
        const { error: dbError } = await supabase.from("detections").insert({
          user_id: user?.id,
          image_url: publicUrl,
          disease_name: detectionData.diseaseName,
          is_healthy: detectionData.isHealthy,
          confidence: detectionData.confidence,
          remedy: detectionData.remedy,
        });

        if (dbError) throw dbError;

        toast.success("Image analyzed successfully!");
      };

      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to analyze image");
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">PlantCare AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/history")}
            >
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Card */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Your Dashboard</CardTitle>
              <CardDescription>
                Upload a leaf image to detect diseases and get treatment recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Leaf Image</CardTitle>
              <CardDescription>
                Take a clear photo of the leaf for accurate disease detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-full max-w-md">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected leaf"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG (MAX. 5MB)</p>
                      </div>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                  </label>
                </div>
                {analyzing && (
                  <div className="flex items-center gap-2 text-primary">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Analyzing image with AI...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <Card className={result.isHealthy ? "border-primary" : "border-destructive"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf
                    className={`h-5 w-5 ${
                      result.isHealthy ? "text-primary" : "text-destructive"
                    }`}
                  />
                  Detection Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-lg font-semibold">
                      {result.isHealthy ? "Healthy" : "Disease Detected"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Disease</p>
                    <p className="text-lg font-semibold">{result.diseaseName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-lg font-semibold">{result.confidence}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Recommended Action</p>
                  <p className="text-sm leading-relaxed">{result.remedy}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;