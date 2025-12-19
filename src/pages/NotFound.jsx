import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-display font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
