import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ShareModal } from "@/components/ShareModal";
import { useShare } from "@/hooks/useShare";
import { useProductsCart } from "@/hooks/useProductsCart";
import { products, Product } from "@/data/products";
import { 
  Star, 
  IndianRupee, 
  User, 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  MapPin,
  Clock,
  Shield,
  Share2,
  Plus,
  Minus,
  Package
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart, getCartItemQuantity } = useProductsCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { shareContent, showShareModal, shareData, closeShareModal } = useShare();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find(p => p.id === parseInt(id || "0"));
    setProduct(foundProduct || null);
    setIsLoading(false);
    
    if (foundProduct) {
      document.title = `${foundProduct.name} • Discover Jharkhand`;
    } else {
      document.title = `Product Not Found • Discover Jharkhand`;
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`Added ${quantity} ${product.name}(s) to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/marketplace'); // Go back to marketplace where cart is located
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      // Simulate adding to wishlist
      alert(`Added ${product.name} to wishlist!`);
    }
  };

  const handleShare = () => {
    if (product) {
      shareContent('product', product);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/marketplace")} variant="outline">
            <ArrowLeft className="mr-2" size={16} />
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/marketplace")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Marketplace
          </Button>
          <LanguageToggle />
        </div>
      </div>

      <div className="px-6 py-6 pb-32 max-w-4xl mx-auto">
        {/* Product Header */}
        <LuxuryCard className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-playfair font-bold text-foreground mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-sm">
                      {product.category}
                    </Badge>
                    {product.inStock ? (
                      <Badge variant="default" className="bg-green-500 text-white text-sm">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-sm">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart size={16} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="text-accent fill-accent" size={16} />
                    <span className="ml-1 font-semibold">{product.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="ml-1 font-semibold text-lg">{product.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Price</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <h3 className="font-medium text-foreground mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="font-medium text-lg min-w-[3rem] text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
        </div>

        {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-semibold"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="mr-2" size={16} />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="mr-2" size={16} />
                    Add to Wishlist
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/seller/${encodeURIComponent(product.sellerProfile.businessName)}`)}
                >
                  <User className="mr-2" size={16} />
                  Seller Profile
                </Button>
              </div>
            </div>
          </div>
        </LuxuryCard>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Product Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </LuxuryCard>

            {/* Features */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Key Features</h2>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield size={14} className="mr-2 text-primary" />
                  Handmade by local artisans
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={14} className="mr-2 text-primary" />
                  Authentic Jharkhand product
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={14} className="mr-2 text-primary" />
                  Traditional techniques used
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star size={14} className="mr-2 text-primary" />
                  High quality materials
                </div>
              </div>
            </LuxuryCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Information */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Seller Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User size={16} className="mr-3 text-primary" />
                  <div>
                    <span className="text-sm font-medium">{product.sellerProfile.name}</span>
                    <p className="text-xs text-muted-foreground">{product.sellerProfile.businessName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="mr-3 text-accent" />
                  <span className="text-sm">{product.sellerProfile.averageRating} rating</span>
                </div>
                <div className="flex items-center">
                  <Shield size={16} className="mr-3 text-green-500" />
                  <span className="text-sm text-green-600">Verified Seller</span>
                </div>
                <div className="flex items-center">
                  <Package size={16} className="mr-3 text-primary" />
                  <span className="text-sm">{product.sellerProfile.totalProducts} products</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate(`/seller/${encodeURIComponent(product.sellerProfile.businessName)}`)}
              >
                <User className="mr-2" size={16} />
                View Seller Profile
              </Button>
            </LuxuryCard>

            {/* Shipping Information */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Shipping & Returns</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock size={14} className="mr-2" />
                  <span>Free shipping on orders above ₹500</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2" />
                  <span>Delivered within 5-7 business days</span>
                </div>
                <div className="flex items-center">
                  <Shield size={14} className="mr-2" />
                  <span>7-day return policy</span>
                </div>
              </div>
            </LuxuryCard>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareData && (
        <ShareModal
          isOpen={showShareModal}
          onClose={closeShareModal}
          shareData={shareData}
        />
      )}
    </div>
  );
}
