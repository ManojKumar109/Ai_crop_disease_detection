import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Shield, Zap, Users, Camera, LineChart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Leaf className="h-7 w-7 text-primary" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">LeafWise</span>
              <p className="text-xs text-muted-foreground">AI Crop Disease Detection</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="lg" className="text-base">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" className="text-base px-6 shadow-medium">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-primary font-semibold">🌱 Powered by Advanced AI</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="text-foreground">Protect Your Crops with</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Smart Detection
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Identify plant diseases instantly using AI. Upload a leaf image and receive accurate diagnosis with expert treatment recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-10 py-6 h-auto shadow-strong hover:shadow-medium transition-all">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Detection
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 h-auto border-2">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Farmers Trust LeafWise</h2>
            <p className="text-xl text-muted-foreground">Reliable, fast, and farmer-friendly technology</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get disease analysis in seconds with our lightning-fast AI engine",
                color: "text-yellow-600"
              },
              {
                icon: Shield,
                title: "High Accuracy",
                description: "Over 90% accuracy across multiple crop types and disease categories",
                color: "text-primary"
              },
              {
                icon: Leaf,
                title: "Wide Coverage",
                description: "Detects dozens of diseases across various crops and plant types",
                color: "text-green-600"
              },
              {
                icon: LineChart,
                title: "Track History",
                description: "Monitor disease trends and treatment effectiveness over time",
                color: "text-accent"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="p-8 text-center hover:shadow-strong transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
                <div className="inline-block p-4 bg-background rounded-2xl mb-6">
                  <feature.icon className={`h-12 w-12 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple 3-Step Process</h2>
            <p className="text-xl text-muted-foreground">Easy to use for farmers of all backgrounds</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { 
                step: "1", 
                title: "Upload Leaf Photo", 
                description: "Take a clear picture of the affected leaf using your phone or camera",
                icon: Camera
              },
              { 
                step: "2", 
                title: "AI Analyzes Image", 
                description: "Our advanced AI model processes and identifies any diseases instantly",
                icon: Zap
              },
              { 
                step: "3", 
                title: "Get Treatment Plan", 
                description: "Receive detailed diagnosis with proven remedies and prevention tips",
                icon: BookOpen
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto shadow-strong">
                    {item.step}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 p-2 bg-background rounded-full border-4 border-background shadow-medium">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-2xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Protect Your Harvest?</h2>
          <p className="text-2xl mb-10 opacity-95 max-w-2xl mx-auto">Join thousands of farmers using AI for healthier crops and better yields</p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-xl px-12 py-7 h-auto shadow-strong hover:shadow-medium transition-all">
              <Users className="mr-3 h-6 w-6" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="font-bold text-lg">LeafWise</span>
                <p className="text-xs text-muted-foreground">AI Crop Protection</p>
              </div>
            </div>
            <div className="flex gap-8 text-base">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact</Link>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">Terms</a>
            </div>
            <p className="text-muted-foreground">© 2024 LeafWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
