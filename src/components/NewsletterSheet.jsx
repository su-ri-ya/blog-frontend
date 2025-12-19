import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSheet = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive our latest stories in your inbox.",
    });
    setEmail("");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Subscribe
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Subscribe to our newsletter</SheetTitle>
          <SheetDescription>
            Get the latest stories and insights delivered to your inbox.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default NewsletterSheet;
