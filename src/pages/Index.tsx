import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Shield, Zap, Users, Camera, LineChart, BookOpen, Brain, Clock, CheckCircle, Sprout, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle transition-colors duration-300 relative overflow-hidden">
      {/* Sunlight gradient overlay */}
      <div className="absolute inset-0 bg-gradient-sunlight pointer-events-none" />
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/90 backdrop-blur-md sticky top-0 z-50 shadow-soft relative">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="p-1.5 sm:p-2 bg-primary/15 rounded-xl group-hover:bg-primary/25 transition-all duration-300">
                <Leaf className="h-5 w-5 sm:h-7 sm:w-7 text-primary group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">AICDD</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">AI Crop Disease Detection</p>
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-sm sm:text-base">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="text-sm sm:text-base px-4 sm:px-6 shadow-glow-green bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.3) saturate(0.8)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/98 via-background/95 to-background/90 z-0" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/15 rounded-full border border-primary/30 backdrop-blur-sm animate-float">
              <Microscope className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm">Powered by CNN Deep Learning Technology</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Protect Your Crops with</span>
              <br />
              <span className="bg-gradient-to-r from-crop-green via-leaf-green to-crop-green bg-clip-text text-transparent animate-glow">
                Smart Detection
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered leaf image diagnosis using Convolutional Neural Networks to detect crop diseases instantly. Get accurate results and treatment recommendations in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-6 sm:pt-8">
              <Link to="/auth" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-base sm:text-lg px-10 sm:px-12 py-6 sm:py-7 h-auto shadow-glow-green hover:shadow-strong bg-primary hover:bg-primary/90 transition-all hover:scale-105 rounded-2xl font-semibold"
                >
                  <Camera className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                  Detect Now
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-base sm:text-lg px-10 sm:px-12 py-6 sm:py-7 h-auto border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105 rounded-2xl font-semibold"
                >
                  <BookOpen className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                  Learn How It Works
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-10 sm:pt-14 max-w-3xl mx-auto">
              <div className="text-center p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">95%+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Accuracy Rate</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">&lt;5s</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Detection Time</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Diseases Detected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card/40 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Why Choose AICDD</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Advanced technology for modern agriculture</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
            {[
              {
                icon: Brain,
                title: "AI Powered",
                desc: "Deep learning CNN models trained on thousands of crop disease images",
                color: "text-crop-green"
              },
              {
                icon: Clock,
                title: "Real-time Analysis",
                desc: "Get instant disease detection results in under 5 seconds",
                color: "text-leaf-green"
              },
              {
                icon: Shield,
                title: "High Accuracy",
                desc: "95%+ accuracy rate validated by agricultural experts",
                color: "text-crop-green"
              },
              {
                icon: CheckCircle,
                title: "Treatment Guide",
                desc: "Receive actionable treatment recommendations immediately",
                color: "text-leaf-green"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 sm:p-8 text-center hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-border/50 rounded-2xl group">
                <div className="inline-block p-4 sm:p-5 bg-primary/10 rounded-2xl mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className={`h-10 w-10 sm:h-12 sm:w-12 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Three simple steps to protect your crops</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-5xl mx-auto">
            {[
              { 
                step: "1", 
                title: "Upload Leaf Image", 
                desc: "Take or upload a clear photo of the affected crop leaf",
                icon: Camera
              },
              { 
                step: "2", 
                title: "AI Analysis", 
                desc: "Our CNN model analyzes the image and identifies diseases",
                icon: Brain
              },
              { 
                step: "3", 
                title: "Get Results", 
                desc: "Receive instant diagnosis with treatment recommendations",
                icon: CheckCircle
              }
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-crop-green to-leaf-green text-primary-foreground flex items-center justify-center text-3xl sm:text-4xl font-bold mx-auto shadow-glow-green group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-2 sm:p-2.5 bg-card rounded-full border-3 sm:border-4 border-background shadow-medium group-hover:bg-primary/10 transition-colors duration-300">
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-crop-green via-leaf-green to-crop-green text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-crop-green/50 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <Sprout className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-6 opacity-90 animate-float" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Start Protecting Your Crops Today</h2>
            <p className="text-base sm:text-lg lg:text-2xl mb-8 sm:mb-10 opacity-95 leading-relaxed">Join thousands of farmers using AI technology to safeguard their harvests</p>
            <Link to="/auth">
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto text-base sm:text-lg lg:text-xl px-10 sm:px-14 py-6 sm:py-8 h-auto shadow-strong hover:shadow-glow-brown transition-all hover:scale-105 rounded-2xl font-semibold bg-card text-foreground hover:bg-card/90"
              >
                <Camera className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7" />
                Start Free Detection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 sm:py-14 bg-card/60 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 order-1 lg:order-1 group">
              <div className="p-2 sm:p-2.5 bg-primary/15 rounded-xl group-hover:bg-primary/25 transition-all duration-300">
                <Leaf className="h-6 w-6 sm:h-7 sm:w-7 text-primary group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg text-foreground">AICDD</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground">AI Crop Disease Detection</p>
              </div>
            </Link>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-7 lg:gap-9 text-sm sm:text-base order-3 lg:order-2">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact</Link>
              <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors font-medium">Login</Link>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">Privacy</a>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground order-2 lg:order-3">© 2025 AICDD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
