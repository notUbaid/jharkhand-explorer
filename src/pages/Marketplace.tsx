import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  IndianRupee, 
  User,
  Plus,
  Clock,
  MapPin,
  Users,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Handwoven Tribal Saree",
    seller: "Santhal Weavers Co-op",
    price: "₹2,500",
    rating: 4.8,
    image: "/placeholder.svg",
    category: "Clothing/Textiles",
    inStock: true,
  },
  {
    id: 2,
    name: "Dokra Metal Elephant",
    seller: "Heritage Crafts",
    price: "₹1,200",
    rating: 4.6,
    image: "/placeholder.svg",
    category: "Handicrafts",
    inStock: true,
  },
  {
    id: 3,
    name: "Organic Madua Flour",
    seller: "Tribal Farmers Union",
    price: "₹180",
    rating: 4.9,
    image: "/placeholder.svg",
    category: "Food Items",
    inStock: true,
  },
  {
    id: 4,
    name: "Bamboo Basket Set",
    seller: "Eco Craft Studio",
    price: "₹800",
    rating: 4.7,
    image: "/placeholder.svg",
    category: "Handicrafts",
    inStock: false,
  },
];

const experiences = [
  {
    id: 1,
    title: "Tribal Art Workshop",
    instructor: "Master Craftsman Ravi",
    price: "₹1,500",
    duration: "4 hours",
    rating: 4.9,
    image: "/placeholder.svg",
    location: "Ranchi",
    maxParticipants: 12,
    nextSlot: "Tomorrow 10:00 AM",
  },
  {
    id: 2,
    title: "Traditional Cooking Class",
    instructor: "Chef Meera Devi",
    price: "₹2,000",
    duration: "6 hours",
    rating: 4.8,
    image: "/placeholder.svg",
    location: "Jamshedpur",
    maxParticipants: 8,
    nextSlot: "This Weekend",
  },
  {
    id: 3,
    title: "Bamboo Craft Making",
    instructor: "Artisan Kumar",
    price: "₹1,200",
    duration: "3 hours",
    rating: 4.7,
    image: "/placeholder.svg",
    location: "Hazaribagh",
    maxParticipants: 15,
    nextSlot: "Next Monday",
  },
];

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("products");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const navigate = useNavigate();

  const productCategories = ["All", "Handicrafts", "Food Items", "Clothing/Textiles", "Souvenirs"];

  const toggleFavorite = (id: number, type: 'product' | 'experience') => {
    const key = `${type}-${id}`;
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const addToCart = (id: number) => {
    setCart(prev => [...prev, id]);
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <h1 className="text-2xl font-playfair font-bold text-center mb-4">
          Marketplace
        </h1>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search products, experiences..."
        />
      </div>

      <div className="px-6 -mt-2 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="products" className="font-medium">Products</TabsTrigger>
            <TabsTrigger value="experiences" className="font-medium text-center">Experiences</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            {/* Product Categories */}
            <div className="section-spacing space-y-4">
              <h3 className="section-title">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {productCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <LuxuryCard 
                  key={product.id}
                  className="p-0 overflow-hidden"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <div className="relative">
                    <div className="aspect-square bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id, 'product');
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                    >
                      <Heart 
                        size={14} 
                        className={favorites.includes(product.id) ? 'text-accent fill-accent' : 'text-muted-foreground'} 
                      />
                    </button>
                  </div>

                  <div className="p-3">
                    <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <User size={10} className="mr-1" />
                      {product.seller}
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Star className="text-accent fill-accent" size={12} />
                        <span className="text-xs font-medium ml-1">{product.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <IndianRupee size={14} className="text-accent" />
                        <span className="font-bold text-accent">{product.price}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        disabled={!product.inStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                        className="text-xs px-2 py-1 h-7"
                      >
                        <ShoppingCart size={12} className="mr-1" />
                        {product.inStock ? 'Add' : 'Unavailable'}
                      </Button>
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>

            {/* List Product Button */}
            <LuxuryCard className="mt-6 text-center bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="py-4">
                <Plus className="mx-auto text-primary mb-2" size={24} />
                <h3 className="font-playfair font-semibold text-foreground mb-1">
                  Sell Your Products
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Join our marketplace and reach thousands of tourists
                </p>
                <Button variant="outline" className="text-primary border-primary">
                  List Your Product
                </Button>
              </div>
            </LuxuryCard>
          </TabsContent>

          <TabsContent value="experiences" className="space-y-4">
            {/* Experiences List */}
            <div className="space-y-4">
              {experiences.map((experience) => (
                <LuxuryCard 
                  key={experience.id}
                  className="p-0 overflow-hidden"
                  onClick={() => navigate(`/experiences/${experience.id}`)}
                >
                  <div className="flex">
                    <div className="w-24 h-24 bg-muted flex-shrink-0">
                      <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-playfair font-semibold text-foreground mb-1">
                            {experience.title}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <User size={12} className="mr-1" />
                            {experience.instructor}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin size={12} className="mr-1" />
                            {experience.location}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(experience.id, 'experience');
                          }}
                          className="p-1"
                        >
                          <Heart 
                            size={16} 
                            className={favorites.includes(experience.id) ? 'text-accent fill-accent' : 'text-muted-foreground'} 
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock size={10} className="mr-1" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center">
                          <Users size={10} className="mr-1" />
                          Max {experience.maxParticipants}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center mr-3">
                            <Star className="text-accent fill-accent" size={12} />
                            <span className="text-xs font-medium ml-1">{experience.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <IndianRupee size={14} className="text-accent" />
                            <span className="font-bold text-accent">{experience.price}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">Next slot:</p>
                          <p className="text-xs font-medium text-primary">{experience.nextSlot}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>

            {/* List Experience Button */}
            <LuxuryCard className="mt-6 text-center bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
              <div className="py-4">
                <Plus className="mx-auto text-accent mb-2" size={24} />
                <h3 className="font-playfair font-semibold text-foreground mb-1">
                  Host Your Workshop
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Share your skills and culture with visitors
                </p>
                <Button variant="outline" className="text-accent border-accent">
                  List Your Workshop
                </Button>
              </div>
            </LuxuryCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}