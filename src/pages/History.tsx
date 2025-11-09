import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, Loader2, Trash2, LogOut, Calendar, TrendingUp } from "lucide-react";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { format } from "date-fns";

interface Detection {
  id: string;
  image_url: string;
  disease_name: string;
  is_healthy: boolean;
  confidence: number;
  remedy: string;
  created_at: string;
}

const History = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("detections")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDetections(data || []);
    } catch (error: any) {
      console.error("Error loading history:", error);
      toast.error("Failed to load detection history");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("detections").delete().eq("id", id);

      if (error) throw error;

      setDetections(detections.filter((d) => d.id !== id));
      toast.success("Detection deleted successfully");
    } catch (error: any) {
      console.error("Error deleting detection:", error);
      toast.error("Failed to delete detection");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="lg" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
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
          <div className="text-center">
            <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-4">
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Detection History</h1>
            <p className="text-xl text-muted-foreground">
              Track your crop health analysis over time
            </p>
          </div>

          {detections.length === 0 ? (
            <Card className="shadow-medium border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="p-6 bg-muted rounded-full mb-6">
                  <Leaf className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No Detection History Yet</h3>
                <p className="text-muted-foreground mb-6 text-center max-w-md">
                  Start analyzing your crop leaves to build your detection history
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                  className="shadow-medium"
                >
                  Upload Your First Image
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {detections.map((detection) => (
                <Card
                  key={detection.id}
                  className={`shadow-medium hover:shadow-strong transition-all ${
                    detection.is_healthy ? "border-primary/30" : "border-destructive/30"
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl flex items-center gap-3 mb-2">
                          <Leaf
                            className={`h-7 w-7 ${
                              detection.is_healthy ? "text-primary" : "text-destructive"
                            }`}
                          />
                          {detection.disease_name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-base">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(detection.created_at), "PPpp")}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(detection.id)}
                        className="hover:bg-destructive/10"
                      >
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-[200px_1fr] gap-6">
                      <img
                        src={detection.image_url}
                        alt="Leaf analysis"
                        className="w-full h-48 object-cover rounded-xl border-2 border-border"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-secondary/20 rounded-xl">
                          <p className="text-sm text-muted-foreground mb-1 font-medium uppercase">Status</p>
                          <p className="text-lg font-bold">
                            {detection.is_healthy ? "✓ Healthy" : "⚠ Disease Detected"}
                          </p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded-xl">
                          <p className="text-sm text-muted-foreground mb-1 font-medium uppercase">Confidence</p>
                          <p className="text-lg font-bold">{detection.confidence}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-card rounded-xl border border-border/50">
                      <p className="text-sm text-muted-foreground mb-2 font-medium uppercase">Treatment Recommendation</p>
                      <p className="leading-relaxed">{detection.remedy}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
