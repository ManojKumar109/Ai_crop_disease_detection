import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, LogOut, Leaf, History, Loader2, Camera, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { User, Session } from "@supabase/supabase-js";
import { ThemeToggle } from "@/components/ThemeToggle";

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

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        setSelectedImage(base64Image);

        const fileExt = file.name.split(".").pop();
        const fileName = `${user?.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("leaf-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("leaf-images")
          .getPublicUrl(fileName);

        setAnalyzing(true);
        const { data: detectionData, error: detectionError } = await supabase.functions.invoke(
          "detect-disease",
          {
            body: { imageData: base64Image },
          }
        );

        if (detectionError) throw detectionError;

        setResult(detectionData);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Leaf className="h-7 w-7 text-primary" />
            </div>
            <div>
              <span className="text-2xl font-bold">AICDD</span>
              <p className="text-xs text-muted-foreground">AI Crop Disease Detection</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/history")}
              className="border-2"
            >
              <History className="h-5 w-5 mr-2" />
              History
            </Button>
            <Button variant="ghost" size="lg" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-border/50 shadow-medium">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-primary" />
                Welcome to Your Dashboard
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Upload a leaf image to detect diseases and get instant AI-powered recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Upload Section */}
          <Card className="shadow-strong border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Camera className="h-6 w-6 text-primary" />
                Detect Plant Diseases Instantly 🌱
              </CardTitle>
              <CardDescription className="text-base">
                Click to upload an image or use your camera to capture a fresh leaf photo for quick AI detection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-border rounded-2xl cursor-pointer bg-secondary/20 hover:bg-secondary/30 transition-all duration-300"
                  >
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected leaf"
                        className="w-full h-full object-contain rounded-2xl p-4"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="p-6 bg-primary/10 rounded-full mb-6 transition-transform hover:scale-110">
                          <Upload className="w-16 h-16 text-primary" />
                        </div>
                        <p className="mb-3 text-xl font-semibold text-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-base text-muted-foreground">
                          PNG, JPG, JPEG (Maximum 5MB)
                        </p>
                      </div>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*;capture=camera"
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                  </label>
                </div>
                {analyzing && (
                  <div className="flex items-center gap-3 text-primary bg-primary/10 px-6 py-4 rounded-full animate-pulse">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-base font-semibold">Analyzing your image...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <Card className={`shadow-strong transition-all duration-300 ${result.isHealthy ? "border-primary border-2" : "border-destructive border-2"}`}>
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl flex items-center gap-3">
                  {result.isHealthy ? (
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  )}
                  Detection Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-border/50 shadow-soft hover:shadow-medium transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      {result.isHealthy ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-destructive" />
                      )}
                      <p className="text-sm text-muted-foreground font-medium uppercase">Status</p>
                    </div>
                    <p className={`text-2xl font-bold ${result.isHealthy ? "text-primary" : "text-destructive"}`}>
                      {result.isHealthy ? "✓ Healthy" : "⚠ Disease Detected"}
                    </p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/10 border-border/50 shadow-soft hover:shadow-medium transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Leaf className="h-6 w-6 text-primary" />
                      <p className="text-sm text-muted-foreground font-medium uppercase">Disease Type</p>
                    </div>
                    <p className="text-2xl font-bold">{result.diseaseName}</p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-border/50 shadow-soft hover:shadow-medium transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="h-6 w-6 text-primary" />
                      <p className="text-sm text-muted-foreground font-medium uppercase">Confidence Level</p>
                    </div>
                    <p className="text-2xl font-bold mb-3">{result.confidence}%</p>
                    <Progress value={result.confidence} className="h-3 transition-all duration-500" />
                  </Card>
                </div>
                <Card className="p-6 bg-gradient-card border-border/50 shadow-soft">
                  <p className="text-sm text-muted-foreground mb-3 font-medium uppercase flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Recommended Treatment
                  </p>
                  <p className="text-base leading-relaxed">{result.remedy}</p>
                </Card>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
