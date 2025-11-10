import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Shield, Zap, Users, Camera, LineChart, BookOpen, Brain, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                <Leaf className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-foreground">AICDD</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">AI Crop Disease Detection</p>
              </div>
            </Link>
            <div className="flex gap-2 sm:gap-3">
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-sm sm:text-base sm:size-lg">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="text-sm sm:text-base sm:size-lg px-4 sm:px-6 shadow-medium">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-28 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background z-0" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full border border-primary/20">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm">Powered by Advanced AI & Deep Learning</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Protect Your Crops</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                with Smart Detection
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Upload a leaf image and get accurate disease diagnosis in seconds. Powered by cutting-edge Convolutional Neural Networks (CNN) and image recognition technology to help farmers, students, and researchers protect crops and increase yields.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
              <Link to="/auth" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 h-auto shadow-strong hover:shadow-medium transition-all">
                  <Camera className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Start Detection Now
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 h-auto border-2">
                  <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Learn How It Works
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">95%+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">&lt;5s</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Detection Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Diseases</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Why Choose AICDD</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Advanced AI technology designed for farmers and researchers</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered CNN",
                description: "Deep learning Convolutional Neural Networks trained on thousands of plant disease images",
                color: "text-primary"
              },
              {
                icon: Clock,
                title: "Real-Time Detection",
                description: "Upload a leaf photo and get instant disease identification within seconds",
                color: "text-accent"
              },
              {
                icon: Shield,
                title: "95%+ Accuracy",
                description: "Industry-leading accuracy across 50+ crop diseases including blight, rust, and leaf spot",
                color: "text-primary"
              },
              {
                icon: CheckCircle,
                title: "Treatment Advice",
                description: "Receive detailed remedies, prevention tips, and sustainable farming recommendations",
                color: "text-accent"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 sm:p-8 text-center hover:shadow-strong transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
                <div className="inline-block p-3 sm:p-4 bg-background rounded-2xl mb-4 sm:mb-6">
                  <feature.icon className={`h-10 w-10 sm:h-12 sm:w-12 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Three simple steps to diagnose crop diseases with AI</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-5xl mx-auto">
            {[
              { 
                step: "1", 
                title: "Upload Leaf Image", 
                description: "Take or upload a clear photo of the crop leaf showing disease symptoms. Works with any device - phone, tablet, or computer.",
                icon: Camera
              },
              { 
                step: "2", 
                title: "AI Analysis", 
                description: "Our CNN-based deep learning model instantly analyzes the image using advanced pattern recognition and computer vision.",
                icon: Brain
              },
              { 
                step: "3", 
                title: "Get Results & Solutions", 
                description: "Receive disease name, confidence score, detailed symptoms, and proven treatment recommendations for your crops.",
                icon: CheckCircle
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto shadow-strong">
                    {item.step}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 p-1.5 sm:p-2 bg-background rounded-full border-2 sm:border-4 border-background shadow-medium">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Start Detecting Diseases Today</h2>
            <p className="text-base sm:text-lg lg:text-2xl mb-8 sm:mb-10 opacity-95">Join farmers, students, and researchers worldwide using AI to protect crops and promote sustainable agriculture</p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg lg:text-xl px-8 sm:px-12 py-5 sm:py-7 h-auto shadow-strong hover:shadow-medium transition-all">
                <Camera className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Start Free Detection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 sm:py-12 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 order-1 lg:order-1">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg">AICDD</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground">AI Crop Disease Detection</p>
              </div>
            </Link>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base order-3 lg:order-2">
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
