import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Leaf, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event from the reset link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // User arrived via reset link — they can now set a new password
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated successfully!");
      navigate("/auth");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        <Link to="/auth" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Sign In</span>
        </Link>

        <Card className="shadow-strong border-border/50 bg-gradient-card">
          <CardHeader className="space-y-3 text-center pb-8">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-2xl shadow-medium">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Set New Password</CardTitle>
            <CardDescription className="text-base">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReset} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pl-11 h-12 text-base"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-base font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pl-11 h-12 text-base"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold shadow-medium hover:shadow-soft transition-all"
                disabled={loading}
                size="lg"
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
