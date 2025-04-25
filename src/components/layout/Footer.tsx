
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-muted py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <Link to="/" className="font-bold text-lg">
              Kind Hearts 
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Making learning fun and engaging
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link to="/about" className="text-sm hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> for young learners
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} Kind Hearts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
