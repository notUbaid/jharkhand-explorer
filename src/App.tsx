import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { PackageComparisonProvider } from "@/contexts/PackageComparisonContext";
import { TransportComparisonProvider } from "@/contexts/TransportComparisonContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { StayComparisonProvider } from "@/contexts/StayComparisonContext";
import { enhancedScrollManager } from "@/utils/enhanced-scroll-manager";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import Marketplace from "./pages/Marketplace";
import Events from "./pages/Events";
import Transport from "./pages/Transport";
import Stays from "./pages/Stays";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import DestinationDetail from "./pages/DestinationDetail";
import RestaurantDetail from "./pages/RestaurantDetail";
import PackageDetail from "./pages/PackageDetail";
import PackageCompare from "./pages/PackageCompare";
import ProductDetail from "./pages/ProductDetail";
import ProductRegistration from "./pages/ProductRegistration";
import WorkshopRegistration from "./pages/WorkshopRegistration";
import TourGuideRegistration from "./pages/TourGuideRegistration";
import EventRegistration from "./pages/EventRegistration";
import SearchResults from "./pages/SearchResults";
import SellerProfile from "./pages/SellerProfile";
import ExperienceDetail from "./pages/ExperienceDetail";
import TourGuideDetail from "./pages/TourGuideDetail";
import EventDetail from "./pages/EventDetail";
import StayDetail from "./pages/StayDetail";
import StayCompare from "./pages/StayCompare";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize enhanced scroll manager
    enhancedScrollManager.init();
    
    // Cleanup on unmount
    return () => {
      enhancedScrollManager.destroy();
    };
  }, []);

  return (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <PackageComparisonProvider>
          <TransportComparisonProvider>
            <StayComparisonProvider>
              <FavoritesProvider>
                <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <div className="relative min-h-screen bg-background">
                    <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<DestinationDetail />} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />

              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/packages/compare" element={<PackageCompare />} />

              <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/product-registration" element={<ProductRegistration />} />
      <Route path="/workshop-registration" element={<WorkshopRegistration />} />
      <Route path="/tourguide-registration" element={<TourGuideRegistration />} />
      <Route path="/event-registration" element={<EventRegistration />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/seller/:sellerId" element={<SellerProfile />} />
              <Route path="/experiences/:id" element={<ExperienceDetail />} />
              <Route path="/tourguides/:id" element={<TourGuideDetail />} />

              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />

              <Route path="/transport" element={<Transport />} />

              <Route path="/stays" element={<Stays />} />
              <Route path="/stays/:id" element={<StayDetail />} />
              <Route path="/stays/compare" element={<StayCompare />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
                    </Routes>
                    <BottomNavigation />
                  </div>
                </BrowserRouter>
                </TooltipProvider>
                </FavoritesProvider>
              </StayComparisonProvider>
            </TransportComparisonProvider>
          </PackageComparisonProvider>
        </DarkModeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
  );
};

export default App;
