import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const url = new URL(window.location.href);
        const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
        const queryParams = url.searchParams;

        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const code = queryParams.get("code");
        const errorDescription = hashParams.get("error_description") || queryParams.get("error_description");
        const errorMessage = hashParams.get("error") || queryParams.get("error");

        console.log("OAuth callback received", {
          pathname: url.pathname,
          hasCode: Boolean(code),
          hasAccessToken: Boolean(accessToken),
          hasRefreshToken: Boolean(refreshToken),
          errorMessage,
          errorDescription,
        });

        if (errorMessage || errorDescription) {
          throw new Error(errorDescription || errorMessage || "Google sign-in failed");
        }

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
        } else {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (!data.session) {
            throw new Error("No authentication data found in callback URL");
          }
        }

        console.log("OAuth callback successful");
        toast.success("Signed in with Google successfully!");
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("OAuth callback error:", error);
        toast.error(error instanceof Error ? error.message : "Google sign-in failed");
        navigate("/auth", { replace: true });
      }
    };

    void handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md shadow-strong border-border/50 bg-gradient-card">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-2xl shadow-medium">
              <Leaf className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Completing Sign-In</CardTitle>
          <CardDescription className="text-base">
            Please wait while we finish your Google authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-8">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;
