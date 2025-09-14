import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <LuxuryCard className="text-center max-w-md w-full">
        <div className="py-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-4xl font-playfair font-bold text-primary">404</span>
          </div>
          
          <h1 className="text-2xl font-playfair font-bold text-foreground mb-3">
            Page Not Found
          </h1>
          
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/")}
              className="w-full bg-primary hover:bg-primary-light"
            >
              <Home size={16} className="mr-2" />
              Return to Home
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </LuxuryCard>
    </div>
  );
};

export default NotFound;
