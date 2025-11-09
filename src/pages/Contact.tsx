import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, MessageSquare, Send, ArrowLeft, Loader2, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for contacting us! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-4">
              <MessageSquare className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-strong border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and we'll respond as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-base font-medium">Name</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-base font-medium">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-base font-medium">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us how we can help..."
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={loading}
                      className="text-base"
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-base shadow-medium" disabled={loading} size="lg">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    For general inquiries and support
                  </p>
                  <a
                    href="mailto:support@leafwise.ai"
                    className="text-lg text-primary hover:underline font-medium"
                  >
                    support@leafwise.ai
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Phone className="h-6 w-6 text-primary" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    Call us during business hours
                  </p>
                  <p className="text-lg font-medium">+1 (555) 123-4567</p>
                </CardContent>
              </Card>

              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    We typically respond to all inquiries within 24-48 hours during business days.
                    For urgent technical issues, please call our support line.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-medium">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    Feedback Welcome
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    We're constantly improving our AI models and user experience. Your feedback
                    helps us serve farmers better. Share your thoughts, suggestions, or report any
                    issues you encounter.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
