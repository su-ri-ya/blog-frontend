import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Get in Touch</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Have a story to share or questions about our content? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message..."
              rows={6}
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Send Message
          </Button>
        </form>
      </main>

      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-12 text-center text-sm text-muted-foreground">
          <p>© 2024 Voyager Press. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
