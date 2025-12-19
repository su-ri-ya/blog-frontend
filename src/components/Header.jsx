import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NewsletterSheet from "./NewsletterSheet";

const Header = () => {
  return (
    <header className="relative z-10">
      <nav className="article-grid py-6">
        <div className="article-hero flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold">
            Walflower
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/contact" 
              className="text-sm font-medium hover:text-primary transition-colors hidden sm:inline-block"
            >
              Contact
            </Link>
            <NewsletterSheet />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
