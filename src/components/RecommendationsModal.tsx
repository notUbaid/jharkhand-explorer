import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LuxuryCard } from './ui/luxury-card';
import { 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Clock, 
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  Camera,
  Mountain,
  Building,
  ShoppingBag,
  Car,
  Plane,
  Train,
  Bus,
  Utensils,
  Music,
  Palette,
  BookOpen,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Recommendation {
  id: string;
  type: 'destination' | 'package' | 'experience' | 'stay' | 'product' | 'event';
  title: string;
  description: string;
  image: string;
  price?: string;
  rating?: number;
  location?: string;
  duration?: string;
  category: string;
  reason: string;
  matchScore: number;
}

interface UserFavorite {
  id: string;
  name?: string;
  title?: string;
  type: string;
}

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInterests: string[];
  userFavorites: UserFavorite[];
}

export const RecommendationsModal: React.FC<RecommendationsModalProps> = ({
  isOpen,
  onClose,
  userInterests,
  userFavorites
}) => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate recommendations based on user interests and favorites
  const generateRecommendations = useCallback((): Recommendation[] => {
    const allRecommendations: Recommendation[] = [
      // Destinations
      {
        id: 'rec-1',
        type: 'destination',
        title: 'Netarhat Hill Station',
        description: 'Known as the "Queen of Chotanagpur", Netarhat offers breathtaking sunrise views and cool climate.',
        image: '/assets/Destinations/netarhat.jpg',
        location: 'Latehar District',
        category: 'Nature',
        reason: 'Based on your interest in Nature and Adventure',
        matchScore: 95
      },
      {
        id: 'rec-2',
        type: 'destination',
        title: 'Baidyanath Temple',
        description: 'One of the 12 Jyotirlingas, this ancient temple is a major pilgrimage site.',
        image: '/assets/Destinations/baidyanath.jpg',
        location: 'Deoghar',
        category: 'Cultural',
        reason: 'Perfect for your Cultural interests',
        matchScore: 90
      },
      {
        id: 'rec-3',
        type: 'destination',
        title: 'Betla National Park',
        description: 'Home to tigers, elephants, and diverse wildlife in pristine forest setting.',
        image: '/assets/Destinations/betla.jpg',
        location: 'Palamu District',
        category: 'Nature',
        reason: 'Matches your Nature and Adventure preferences',
        matchScore: 88
      },
      
      // Packages
      {
        id: 'rec-4',
        type: 'package',
        title: 'Spiritual & Cultural Jharkhand Circuit',
        description: 'Explore ancient temples, tribal villages, and cultural heritage sites.',
        image: '/assets/Packages/spiritual-cultural.jpg',
        price: '₹15,000',
        duration: '5 Days / 4 Nights',
        rating: 4.8,
        category: 'Cultural',
        reason: 'Aligns with your Cultural interests',
        matchScore: 92
      },
      {
        id: 'rec-5',
        type: 'package',
        title: 'Jharkhand Adventure & Wilderness Getaway',
        description: 'Trekking, wildlife safaris, and adventure activities in natural settings.',
        image: '/assets/Packages/adventure-wilderness.jpg',
        price: '₹18,000',
        duration: '6 Days / 5 Nights',
        rating: 4.9,
        category: 'Adventure',
        reason: 'Perfect for your Adventure and Nature interests',
        matchScore: 96
      },
      
      // Experiences
      {
        id: 'rec-6',
        type: 'experience',
        title: 'Tribal Cooking Workshop',
        description: 'Learn traditional Santhal and Munda cooking techniques with local families.',
        image: '/assets/Experiences/tribal-cooking.jpg',
        price: '₹2,500',
        duration: '4 Hours',
        rating: 4.7,
        category: 'Food',
        reason: 'Matches your Food interest',
        matchScore: 89
      },
      {
        id: 'rec-7',
        type: 'experience',
        title: 'Wildlife Photography Safari',
        description: 'Professional photography tour in Betla National Park with expert guidance.',
        image: '/assets/Experiences/wildlife-photography.jpg',
        price: '₹3,500',
        duration: 'Full Day',
        rating: 4.8,
        category: 'Nature',
        reason: 'Combines your Nature and Adventure interests',
        matchScore: 91
      },
      
      // Stays
      {
        id: 'rec-8',
        type: 'stay',
        title: 'Eco Lodge Netarhat',
        description: 'Sustainable accommodation with panoramic mountain views and organic meals.',
        image: '/assets/Stays/eco-lodge-netarhat.jpg',
        price: '₹3,500/night',
        rating: 4.6,
        location: 'Netarhat',
        category: 'Nature',
        reason: 'Eco-friendly stay matching your Nature interests',
        matchScore: 87
      },
      
      // Products
      {
        id: 'rec-9',
        type: 'product',
        title: 'Handwoven Tribal Saree',
        description: 'Authentic Santhal tribe handwoven saree with traditional motifs.',
        image: '/assets/Products/tribal-saree.jpg',
        price: '₹4,500',
        category: 'Cultural',
        reason: 'Supports your Cultural interests',
        matchScore: 85
      },
      
      // Events
      {
        id: 'rec-10',
        type: 'event',
        title: 'Sarhul Festival',
        description: 'Traditional tribal spring festival celebrating nature and harvest.',
        image: '/assets/Events/sarhul-festival.jpg',
        price: 'Free',
        duration: '3 Days',
        category: 'Cultural',
        reason: 'Perfect Cultural experience for you',
        matchScore: 93
      }
    ];

    // Filter and sort recommendations based on user interests
    const filteredRecommendations = allRecommendations
      .filter(rec => userInterests.some(interest => 
        rec.category.toLowerCase().includes(interest.toLowerCase()) ||
        rec.reason.toLowerCase().includes(interest.toLowerCase())
      ))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 8); // Show top 8 recommendations

    return filteredRecommendations;
  }, [userInterests]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate loading time
      setTimeout(() => {
        setRecommendations(generateRecommendations());
        setIsLoading(false);
      }, 1500);
    }
  }, [isOpen, userInterests, userFavorites, generateRecommendations]);

  const getTypeIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'destination': return <MapPin size={16} />;
      case 'package': return <Calendar size={16} />;
      case 'experience': return <Zap size={16} />;
      case 'stay': return <Building size={16} />;
      case 'product': return <ShoppingBag size={16} />;
      case 'event': return <Music size={16} />;
      default: return <Star size={16} />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'nature': return <Mountain size={16} />;
      case 'cultural': return <Palette size={16} />;
      case 'adventure': return <Zap size={16} />;
      case 'food': return <Utensils size={16} />;
      default: return <Star size={16} />;
    }
  };

  const handleRecommendationClick = (recommendation: Recommendation) => {
    // Navigate to appropriate page based on type
    switch (recommendation.type) {
      case 'destination':
        navigate('/destinations');
        break;
      case 'package':
        navigate('/packages');
        break;
      case 'experience':
        navigate('/marketplace');
        break;
      case 'stay':
        navigate('/stays');
        break;
      case 'product':
        navigate('/marketplace');
        break;
      case 'event':
        navigate('/events');
        break;
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="text-primary" size={24} />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">Smart Recommendations</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Personalized suggestions based on your interests: {userInterests.join(', ')}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Analyzing your preferences...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((recommendation) => (
                <LuxuryCard 
                  key={recommendation.id} 
                  className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => handleRecommendationClick(recommendation)}
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img 
                        src={recommendation.image} 
                        alt={recommendation.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(recommendation.type)}
                          <h3 className="font-semibold text-foreground truncate">
                            {recommendation.title}
                          </h3>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {recommendation.matchScore}% match
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {recommendation.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                        {recommendation.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin size={12} />
                            <span>{recommendation.location}</span>
                          </div>
                        )}
                        {recommendation.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{recommendation.duration}</span>
                          </div>
                        )}
                        {recommendation.rating && (
                          <div className="flex items-center space-x-1">
                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                            <span>{recommendation.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(recommendation.category)}
                          <Badge variant="secondary" className="text-xs">
                            {recommendation.category}
                          </Badge>
                        </div>
                        {recommendation.price && (
                          <div className="flex items-center space-x-1 text-sm font-medium text-primary">
                            <IndianRupee size={14} />
                            <span>{recommendation.price}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-primary mt-2 italic">
                        💡 {recommendation.reason}
                      </p>
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          )}
        </div>

        {!isLoading && recommendations.length > 0 && (
          <div className="flex-shrink-0 border-t pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {recommendations.length} personalized recommendations
              </p>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
