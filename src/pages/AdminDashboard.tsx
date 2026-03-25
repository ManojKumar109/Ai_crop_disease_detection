import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Leaf, Loader2, Shield, Users } from "lucide-react";
import { format } from "date-fns";

interface DetectionRecord {
  id: string;
  user_name: string;
  user_email: string;
  plant_name: string | null;
  leaf_type: string | null;
  disease_name: string;
  confidence: number;
  is_healthy: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [detections, setDetections] = useState<DetectionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetections = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.rpc("get_all_detections");

      if (error) {
        console.error("Error fetching detections:", error);
      } else {
        setDetections((data as DetectionRecord[]) || []);
      }
      setLoading(false);
    };

    fetchDetections();
  }, [navigate]);

  if (loading) {
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
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <div>
              <span className="text-2xl font-bold">Admin Dashboard</span>
              <p className="text-xs text-muted-foreground">All User Detections</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="border-2"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-border/50 shadow-soft">
              <CardContent className="flex items-center gap-4 p-6">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Detections</p>
                  <p className="text-3xl font-bold">{detections.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-border/50 shadow-soft">
              <CardContent className="flex items-center gap-4 p-6">
                <Leaf className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Unique Users</p>
                  <p className="text-3xl font-bold">
                    {new Set(detections.map((d) => d.user_name)).size}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card className="shadow-strong border-border/50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Detection Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              {detections.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No detections found yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>🌿 Leaf Name</TableHead>
                        <TableHead>Disease</TableHead>
                        <TableHead>Confidence</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detections.map((d) => (
                        <TableRow key={d.id}>
                          <TableCell className="font-medium">
                            {d.user_name || d.user_email || "Unknown"}
                          </TableCell>
                          <TableCell>
                            {d.plant_name
                              ? `${d.plant_name} Leaf`
                              : "—"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={
                                d.is_healthy
                                  ? "text-primary font-medium"
                                  : "text-destructive font-medium"
                              }
                            >
                              {d.disease_name}
                            </span>
                          </TableCell>
                          <TableCell>{d.confidence}%</TableCell>
                          <TableCell className="text-muted-foreground whitespace-nowrap">
                            {format(new Date(d.created_at), "MMM d, yyyy h:mm a")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
