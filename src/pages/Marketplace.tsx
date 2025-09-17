import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { LanguageToggle } from "@/components/LanguageToggle";
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
    name: "Dokra Tribal Necklace",
    seller: "Tribal Artisans Co-op",
    price: "₹1,800",
    rating: 4.9,
    image: "/src/assets/Products/DokraTribalNecklace.png.png",
    category: "Handicrafts",
    inStock: true,
    description: "Handmade brass jewelry with tribal motifs, traditional bell-metal casting"
  },
  {
    id: 2,
    name: "Tussar Silk Saree (Jharkhand weave)",
    seller: "Santhal Weavers Collective",
    price: "₹4,500",
    rating: 4.8,
    image: "/src/assets/Products/Tussar.png",
    category: "Clothing/Textiles",
    inStock: true,
    description: "Indigenous silk, richly textured, known for tribal patterns and earthy hues"
  },
  {
    id: 3,
    name: "Sohrai Painting (Wall Art)",
    seller: "Tribal Women Artists",
    price: "₹2,200",
    rating: 4.7,
    image: "/src/assets/Products/Sohrai.png",
    category: "Handicrafts",
    inStock: true,
    description: "Ritual wall art by tribal women, using natural pigments, animal and plant motifs"
  },
  {
    id: 4,
    name: "Tilkut (Deoghar Sweet)",
    seller: "Deoghar Traditional Sweets",
    price: "₹350",
    rating: 4.9,
    image: "/src/assets/Products/Tilkut.png",
    category: "Food Items",
    inStock: true,
    description: "Made from pounded sesame seeds and jaggery; a winter delicacy of Deoghar"
  },
  {
    id: 5,
    name: "Chhau Dance Decorative Mask (Seraikela style)",
    seller: "Seraikela Chhau Artists",
    price: "₹1,500",
    rating: 4.6,
    image: "/src/assets/Products/Chhau.png",
    category: "Handicrafts",
    inStock: true,
    description: "Colorful masks made of paper-mâché and clay, used in Chhau folk dance"
  },
  {
    id: 6,
    name: "Handwoven Bamboo Basket (Soop)",
    seller: "Bamboo Craft Masters",
    price: "₹650",
    rating: 4.8,
    image: "/src/assets/Products/Handwoven.png",
    category: "Handicrafts",
    inStock: true,
    description: "Traditional woven bamboo trays used in households and rituals"
  },
  {
    id: 7,
    name: "Kohbar Painting (on handmade paper or canvas)",
    seller: "Tribal Art Gallery",
    price: "₹1,800",
    rating: 4.7,
    image: "/src/assets/Products/Kohbar.png",
    category: "Handicrafts",
    inStock: true,
    description: "Ceremonial art associated with tribal weddings, similar to Madhubani in spirit"
  },
  {
    id: 8,
    name: "Thekua (Traditional Snack)",
    seller: "Jharkhand Heritage Foods",
    price: "₹280",
    rating: 4.9,
    image: "/src/assets/Products/Thekua.png",
    category: "Food Items",
    inStock: true,
    description: "Crispy wheat and jaggery cookies, deeply rooted in Jharkhand's festive traditions"
  },
  {
    id: 9,
    name: "Paitkar Scroll Painting (Amadubi Folk Art)",
    seller: "Amadubi Folk Artists",
    price: "₹3,200",
    rating: 4.8,
    image: "/src/assets/Products/Paitka.png",
    category: "Handicrafts",
    inStock: true,
    description: "One of India's oldest scroll art forms, narrating folklore and epics"
  },
  {
    id: 10,
    name: "Mandar Drum (Tribal Instrument)",
    seller: "Tribal Music Instruments",
    price: "₹2,800",
    rating: 4.5,
    image: "/src/assets/Products/Mandar Drum.png",
    category: "Handicrafts",
    inStock: true,
    description: "A traditional percussion instrument, used in tribal rituals and dances"
  },
  {
    id: 11,
    name: "Beaded Santhal Necklace",
    seller: "Santhal Women's Collective",
    price: "₹950",
    rating: 4.7,
    image: "/src/assets/Products/unnamedBeaded.png",
    category: "Handicrafts",
    inStock: true,
    description: "Multicolored bead jewelry made by Santhal women; vibrant and symbolic"
  },
  {
    id: 12,
    name: "Tussar Silk Stole / Scarf",
    seller: "Silk Heritage Weavers",
    price: "₹1,200",
    rating: 4.8,
    image: "/src/assets/Products/Tussar Silk Stole.png",
    category: "Clothing/Textiles",
    inStock: true,
    description: "Lightweight and luxurious, adorned with tribal motifs or natural dyes"
  },
  {
    id: 13,
    name: "Jackfruit Pickle (Achar)",
    seller: "Jharkhand Spice Masters",
    price: "₹180",
    rating: 4.6,
    image: "/src/assets/Products/Jackfruit Pickle.png",
    category: "Food Items",
    inStock: true,
    description: "A local homemade delicacy made from tender jackfruit with native spices"
  },
  {
    id: 14,
    name: "Bamboo Shoot Pickle",
    seller: "Tribal Forest Products",
    price: "₹220",
    rating: 4.5,
    image: "/src/assets/Products/Bamboo Shoot Pickle (Food Items).png",
    category: "Food Items",
    inStock: true,
    description: "Fermented bamboo shoots, a unique tribal delicacy with a tangy flavor"
  },
  {
    id: 15,
    name: "Dokra Bangle Set",
    seller: "Dokra Artisans Guild",
    price: "₹1,100",
    rating: 4.8,
    image: "/src/assets/Products/Dokra Bangle Set.png",
    category: "Handicrafts",
    inStock: true,
    description: "Tribal bell-metal bangles with a rustic, antique finish"
  },
  {
    id: 16,
    name: "Miniature Terracotta Figurines (Maluti Crafts)",
    seller: "Maluti Heritage Crafts",
    price: "₹1,400",
    rating: 4.7,
    image: "/src/assets/Products/Miniature Terracotta Figurines.png",
    category: "Handicrafts",
    inStock: true,
    description: "Inspired by Maluti temples, these miniature idols depict gods, animals, and scenes from mythology"
  },
  {
    id: 17,
    name: "Handmade Stone Pendant (Local Tribal Art)",
    seller: "Stone Art Craftsmen",
    price: "₹750",
    rating: 4.6,
    image: "/src/assets/Products/Handmade Stone Pendant.png",
    category: "Handicrafts",
    inStock: true,
    description: "Carved from locally sourced stones, often with tribal patterns and motifs"
  },
  {
    id: 18,
    name: "Sohrai-Mural Painted Wooden Box or Tray",
    seller: "Tribal Wood Artisans",
    price: "₹1,600",
    rating: 4.8,
    image: "/src/assets/Products/Sohrai-Mural Painted Wooden Box or Tray.png",
    category: "Handicrafts",
    inStock: true,
    description: "Functional art pieces painted in Sohrai style – great as utility gifts or souvenirs"
  },
  {
    id: 19,
    name: "Rugda (Termite Mushroom)",
    seller: "Forest Foragers Collective",
    price: "₹450",
    rating: 4.9,
    image: "/src/assets/Products/Rugda.png",
    category: "Food Items",
    inStock: false,
    description: "A rare monsoon delicacy found only in Jharkhand forests, highly sought after for its flavor"
  },
  {
    id: 20,
    name: "Lac Bangles (Simdega / Khunti)",
    seller: "Lac Craft Specialists",
    price: "₹380",
    rating: 4.7,
    image: "/src/assets/Products/Lac Bangles.png",
    category: "Handicrafts",
    inStock: true,
    description: "Brightly colored bangles made from natural resin (lac), often embellished with mirrors or beads"
  }
];

const experiences = [
  {
    id: 1,
    title: "Sohrai Painting Workshop",
    instructor: "Artist Reena Hansda",
    price: "₹1,800",
    duration: "3.5 hours",
    rating: 4.9,
    image: "/placeholder.svg",
    location: "Hazaribagh",
    maxParticipants: 10,
    nextSlot: "Saturday 11:00 AM",
    description: "Learn traditional Sohrai painting using natural pigments, on paper or fabric."
  },
  {
    id: 2,
    title: "Tribal Music & Drum Circle (Mandar + Nagara)",
    instructor: "Musician Babulal Murmu",
    price: "₹900",
    duration: "2.5 hours",
    rating: 4.7,
    image: "/placeholder.svg",
    location: "Khunti",
    maxParticipants: 20,
    nextSlot: "Tomorrow 4:00 PM",
    description: "Hands-on session with traditional tribal percussion; group rhythm circles in open field."
  },
  {
    id: 3,
    title: "Tussar Silk Weaving Demo + Hands-on Weft Weaving",
    instructor: "Weaver Sita Devi",
    price: "₹2,200",
    duration: "4 hours",
    rating: 4.8,
    image: "/placeholder.svg",
    location: "Bhagaiya, Godda",
    maxParticipants: 8,
    nextSlot: "This Sunday",
    description: "Watch the traditional loom in action and try basic Tussar weaving yourself."
  },
  {
    id: 4,
    title: "Folk Tales by Fire: Santhal Storytelling Night",
    instructor: "Storyteller Doman Tudu",
    price: "₹700",
    duration: "2 hours",
    rating: 4.6,
    image: "/placeholder.svg",
    location: "Dumka",
    maxParticipants: 25,
    nextSlot: "Friday 7:00 PM",
    description: "Listen to age-old tribal tales under the stars with tea and snacks."
  },
  {
    id: 5,
    title: "Dokra Jewelry Making Mini Workshop",
    instructor: "Craftsman Narsingh Munda",
    price: "₹2,500",
    duration: "5 hours",
    rating: 4.9,
    image: "/placeholder.svg",
    location: "Chainpur, Palamu",
    maxParticipants: 6,
    nextSlot: "Next Monday",
    description: "Learn wax casting and try designing a small piece (ring or pendant) with guidance."
  },
  {
    id: 6,
    title: "Wild Edible Plants Walk + Cooking Demo",
    instructor: "Forager and Chef Lata Kisku",
    price: "₹2,200",
    duration: "6 hours",
    rating: 4.8,
    image: "/placeholder.svg",
    location: "Netarhat Forest Edge",
    maxParticipants: 10,
    nextSlot: "Sunday 9:00 AM",
    description: "Forage seasonal greens and cook a forest-style tribal meal."
  },
  {
    id: 7,
    title: "Chhau Dance Intro Class (Seraikela Style)",
    instructor: "Dancer Guru Mohan Singh",
    price: "₹1,500",
    duration: "2 hours",
    rating: 4.9,
    image: "/placeholder.svg",
    location: "Seraikela",
    maxParticipants: 15,
    nextSlot: "Next Friday",
    description: "Learn basic movements of the dramatic martial-style folk dance."
  },
  {
    id: 8,
    title: "Terracotta Tile Painting (Inspired by Maluti Temples)",
    instructor: "Artist Anjali Dutta",
    price: "₹1,300",
    duration: "3 hours",
    rating: 4.7,
    image: "/placeholder.svg",
    location: "Maluti, near Dumka",
    maxParticipants: 12,
    nextSlot: "This Weekend",
    description: "Paint traditional designs on clay tiles, inspired by ancient temple art."
  },
  {
    id: 9,
    title: "Tribal Tattoo & Body Art Demo (Non-permanent)",
    instructor: "Artisan Kiran Tudu",
    price: "₹600",
    duration: "1.5 hours",
    rating: 4.6,
    image: "/placeholder.svg",
    location: "Simdega",
    maxParticipants: 18,
    nextSlot: "Wednesday Afternoon",
    description: "Get a traditional-style Santhal body art motif with safe natural dye (temporary only)."
  },
  {
    id: 10,
    title: "Lac Bangle Craft Session",
    instructor: "Artisan Anita Kumari",
    price: "₹1,400",
    duration: "3 hours",
    rating: 4.8,
    image: "/placeholder.svg",
    location: "Khunti",
    maxParticipants: 10,
    nextSlot: "Saturday 2:00 PM",
    description: "Shape and color your own bangle using natural lac and mirror inlays."
  }
];

export default function Marketplace() {
  const { t } = useTranslation();
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
    <div className="pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-playfair font-bold text-center mb-4">
              {t("marketplace.title")}
            </h1>
          </div>
          <LanguageToggle />
        </div>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder={t("marketplace.searchPlaceholder")}
        />
      </div>

      <div className="px-6 mt-6 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="products" className="font-medium">{t("marketplace.products")}</TabsTrigger>
            <TabsTrigger value="experiences" className="font-medium text-center">{t("marketplace.experiences")}</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Product Categories */}
            <div className="space-y-4">
              <h3 className="section-title">{t("marketplace.categories")}</h3>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {products.map((product) => (
                <LuxuryCard 
                  key={product.id}
                  className="p-0 overflow-hidden"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <div className="relative">
                    <div className="aspect-[3/2] bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain object-center"
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

                  <div className="p-4">
                    <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <User size={12} className="mr-1" />
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

          <TabsContent value="experiences" className="space-y-6">
            {/* Experiences List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {experiences.map((experience) => (
                <LuxuryCard 
                  key={experience.id}
                  className="p-0 overflow-hidden"
                  onClick={() => navigate(`/experiences/${experience.id}`)}
                >
                  <div className="relative">
                    <div className="aspect-[4/3] bg-muted">
                      <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-full h-full object-contain object-center"
                      />
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(experience.id, 'experience');
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                    >
                      <Heart 
                        size={14} 
                        className={favorites.includes(experience.id) ? "text-red-500 fill-red-500" : "text-gray-600"}
                      />
                    </button>
                  </div>
                  
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-inter font-semibold text-foreground mb-1 text-sm">
                          {experience.title}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <User size={10} className="mr-1" />
                          {experience.instructor}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin size={10} className="mr-1" />
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
                        <Clock size={8} className="mr-1" />
                        {experience.duration}
                      </div>
                      <div className="flex items-center">
                        <Users size={8} className="mr-1" />
                        Max {experience.maxParticipants}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          <Star className="text-accent fill-accent" size={10} />
                          <span className="text-xs font-medium ml-1">{experience.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <IndianRupee size={12} className="text-accent" />
                          <span className="font-bold text-accent text-sm">{experience.price}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Next slot:</p>
                        <p className="text-xs font-medium text-primary">{experience.nextSlot}</p>
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