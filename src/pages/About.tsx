import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Brain, Shield, Zap, ArrowLeft } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Leaf className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">About PlantCare AI</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering farmers with AI-driven plant disease detection to increase productivity
              and reduce crop loss
            </p>
          </div>

          {/* Problem Statement */}
          <Card>
            <CardHeader>
              <CardTitle>The Challenge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Powered Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced computer vision models trained on thousands of plant disease images
                  provide accurate, instant diagnosis with confidence scores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Instant Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get disease identification and treatment recommendations in seconds, not days.
                  Early detection means better outcomes for your crops.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Secure & Private
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and protected. All images and detection history are
                  private to your account with enterprise-grade security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Expert Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Receive detailed treatment plans and preventive measures based on the specific
                  disease detected, backed by agricultural science.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technology */}
          <Card>
            <CardHeader>
              <CardTitle>Our Technology</CardTitle>
              <CardDescription>Built with cutting-edge AI and cloud infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Deep Learning Models</h4>
                <p className="text-sm text-muted-foreground">
                  Our system uses state-of-the-art vision AI models trained on comprehensive plant
                  disease datasets, achieving high accuracy across multiple crop types and disease
                  categories.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cloud Infrastructure</h4>
                <p className="text-sm text-muted-foreground">
                  Built on reliable cloud infrastructure ensuring 24/7 availability, fast response
                  times, and scalability to serve farmers worldwide.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Continuous Improvement</h4>
                <p className="text-sm text-muted-foreground">
                  Our models are regularly updated with new disease patterns and agricultural
                  research to provide the most current and accurate diagnoses.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready to protect your crops?</h3>
              <p className="text-muted-foreground max-w-md">
                Join thousands of farmers using AI to detect and treat plant diseases early
              </p>
              <Button size="lg" onClick={() => navigate("/auth")}>
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