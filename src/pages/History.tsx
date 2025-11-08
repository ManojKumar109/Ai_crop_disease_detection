import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, Loader2, Trash2 } from "lucide-react";
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

  if (loading) {
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
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Detection History</h1>
            <p className="text-muted-foreground">
              View all your previous plant disease detections
            </p>
          </div>

          {detections.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Leaf className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No detection history yet</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => navigate("/dashboard")}
                >
                  Upload Your First Image
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {detections.map((detection) => (
                <Card
                  key={detection.id}
                  className={detection.is_healthy ? "border-primary/50" : "border-destructive/50"}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Leaf
                            className={`h-5 w-5 ${
                              detection.is_healthy ? "text-primary" : "text-destructive"
                            }`}
                          />
                          {detection.disease_name}
                        </CardTitle>
                        <CardDescription>
                          {format(new Date(detection.created_at), "PPpp")}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(detection.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <img
                        src={detection.image_url}
                        alt="Leaf analysis"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p className="font-semibold">
                            {detection.is_healthy ? "Healthy" : "Disease Detected"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Confidence</p>
                          <p className="font-semibold">{detection.confidence}%</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Remedy</p>
                      <p className="text-sm leading-relaxed">{detection.remedy}</p>
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