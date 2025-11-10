import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Brain, Shield, Zap, ArrowLeft, Target, Users, CheckCircle2 } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-5">
          <Button variant="ghost" size="lg" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-5 bg-primary/10 rounded-3xl shadow-medium">
                <Leaf className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">About AICDD</h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Empowering farmers with AI-driven plant disease detection to increase productivity
              and reduce crop loss
            </p>
          </div>

          {/* Problem Statement */}
          <Card className="shadow-strong border-border/50 bg-gradient-card">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                The Challenge We're Solving
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-lg">
              <p className="leading-relaxed">
                Farmers worldwide struggle to identify plant diseases in time, leading to
                significant productivity losses and unnecessary pesticide use. Manual
                identification requires expert knowledge and is often slow, resulting in delayed
                treatment and crop damage.
              </p>
              <p className="leading-relaxed">
                Our mission is to democratize access to plant disease expertise through AI
                technology, making professional-grade diagnostics available to every farmer,
                anywhere, anytime.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-10">Our Technology</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-medium hover:shadow-strong transition-all border-border/50">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-3">
                    <Brain className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">AI-Powered Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    Advanced computer vision models trained on thousands of plant disease images
                    provide accurate, instant diagnosis with confidence scores.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-medium hover:shadow-strong transition-all border-border/50">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-3">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Instant Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    Get disease identification and treatment recommendations in seconds, not days.
                    Early detection means better outcomes for your crops.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-medium hover:shadow-strong transition-all border-border/50">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-3">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Secure & Private</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    Your data is encrypted and protected. All images and detection history are
                    private to your account with enterprise-grade security.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-medium hover:shadow-strong transition-all border-border/50">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-3">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Expert Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    Receive detailed treatment plans and preventive measures based on the specific
                    disease detected, backed by agricultural science.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits */}
          <Card className="shadow-strong border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-3xl">Benefits for Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Early disease detection saves crops",
                  "Reduce unnecessary pesticide use",
                  "Increase overall crop productivity",
                  "Save time and money on consultations",
                  "24/7 availability from anywhere",
                  "Build historical disease tracking"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-base leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground shadow-strong border-0">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-6">
              <Leaf className="h-20 w-20" />
              <h3 className="text-4xl font-bold">Ready to protect your crops?</h3>
              <p className="text-xl max-w-2xl opacity-95">
                Join thousands of farmers using AI to detect and treat plant diseases early
              </p>
              <Button size="lg" variant="secondary" onClick={() => navigate("/auth")} className="text-lg px-10 py-6 h-auto shadow-strong">
                Get Started Free
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
