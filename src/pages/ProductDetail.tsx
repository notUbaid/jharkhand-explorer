import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, IndianRupee, User, ArrowLeft, ShoppingCart, Heart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Product #${id} • Discover Jharkhand`;
  }, [id]);

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Badge variant="secondary">Handicrafts</Badge>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Product #{id}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Description, images, seller & actions</p>
      </header>

      <main className="px-6 space-y-6">
        {/* Product Image */}
        <div className="h-64 bg-muted rounded-lg" />
        
        {/* Product Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground"><User size={14} className="mr-1" /> Santhal Weavers Co-op</div>
          <div className="flex items-center text-sm"><Star className="text-accent fill-accent" size={14} /><span className="ml-1 font-medium">4.8</span></div>
          <div className="flex items-center"><IndianRupee size={16} className="text-accent" /><span className="font-bold text-accent">₹2,500</span></div>
        </div>
        {/* About Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">About</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">Handwoven textile crafted by local artisans using traditional techniques. Placeholder description.</p>
        </section>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pb-4">
          <Button className="bg-primary hover:bg-primary-light"><ShoppingCart size={16} className="mr-1" /> Add to Cart</Button>
          <Button variant="outline"><Heart size={16} className="mr-1" /> Add to Wishlist</Button>
          <Button variant="outline">Seller Profile</Button>
        </div>
      </main>
    </div>
  );
}
