import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Switch } from "@/components/ui/switch";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { 
  User, 
  Heart, 
  Calendar, 
  Plus,
  Settings,
  Shield,
  Phone,
  Award,
  Lightbulb,
  Globe,
  Accessibility,
  Sun,
  Moon,
  Type,
  Volume2,
  Trash2,
  AlertTriangle,
  Contact
} from "lucide-react";

const userProfile = {
  name: "Ubaid Khan",
  email: "me.khanubaid@gmail.com",
  phone: "+91 9624444730",
  avatar: "/placeholder.svg",
  joinDate: "Member since Jan 2024",
  language: "English",
  interests: ["Culture", "Nature", "Food", "Adventure"],
};

const favorites = [
  { id: 1, type: "Destination", name: "Betla National Park", image: "/placeholder.svg" },
  { id: 2, type: "Restaurant", name: "Tribal Thali House", image: "/placeholder.svg" },
  { id: 3, type: "Package", name: "Cultural Explorer", image: "/placeholder.svg" },
  { id: 4, type: "Hotel", name: "Heritage Homestay", image: "/placeholder.svg" },
];

const bookings = [
  { id: 1, type: "Package", name: "Wildlife Retreat", date: "March 15-18, 2024", status: "Confirmed" },
  { id: 2, type: "Hotel", name: "Eco Lodge Netarhat", date: "April 5-7, 2024", status: "Pending" },
  { id: 3, type: "Event", name: "Sarhul Festival", date: "March 15, 2024", status: "Confirmed" },
];

const contributions = [
  { id: 1, type: "Event", name: "Folk Music Workshop", status: "Approved" },
  { id: 2, type: "Product", name: "Handwoven Scarves", status: "Under Review" },
];

const achievements = [
  { id: 1, title: "Cultural Explorer", description: "Visited 5+ cultural sites", icon: "🎭" },
  { id: 2, title: "Nature Lover", description: "Explored 3+ national parks", icon: "🌲" },
  { id: 3, title: "Foodie", description: "Tried 10+ local restaurants", icon: "🍽️" },
  { id: 4, title: "Festival Enthusiast", description: "Attended 2+ festivals", icon: "🎉" },
];

const emergencyContacts = [
  { name: "Police", number: "100", color: "destructive" },
  { name: "Ambulance", number: "108", color: "accent" },
  { name: "Women's Helpline", number: "181", color: "primary" },
  { name: "Tourism Helpline", number: "1363", color: "success" },
];

const trustedContacts = [
  { name: "Rajesh Sharma", relation: "Father", number: "+91 98765 43211" },
  { name: "Meera Devi", relation: "Mother", number: "+91 98765 43212" },
];

export default function Profile() {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("personal");
  const [highContrast, setHighContrast] = useState(false);
  const [voiceAssist, setVoiceAssist] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language === "hi" ? "Hindi" : "English");

  const languages = ["English", "Hindi"];
  const fontSizes = ["Small", "Medium", "Large"];

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // Change the i18n language
    const languageCode = language === "English" ? "en" : "hi";
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User size={32} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-playfair font-bold">{userProfile.name}</h1>
              <p className="text-primary-foreground/80 text-sm">{userProfile.joinDate}</p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </div>

      <div className="px-6 -mt-2 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-muted text-xs">
            <TabsTrigger value="personal">{t("profile.personal")}</TabsTrigger>
            <TabsTrigger value="favorites">{t("profile.myFavorites")}</TabsTrigger>
            <TabsTrigger value="bookings">{t("profile.myBookings")}</TabsTrigger>
            <TabsTrigger value="contributions">{t("profile.myReviews")}</TabsTrigger>
            <TabsTrigger value="settings">{t("profile.settings")}</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            {/* Personal Info */}
            <LuxuryCard>
              <h3 className="font-playfair font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium text-foreground">{userProfile.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <p className="font-medium text-foreground">{userProfile.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Language</label>
                  <p className="font-medium text-foreground">{userProfile.language}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Travel Interests</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {userProfile.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Edit Profile
              </Button>
            </LuxuryCard>

            {/* Achievements */}
            <LuxuryCard>
              <div className="flex items-center mb-4">
                <Award className="text-accent mr-2" size={20} />
                <h3 className="font-playfair font-semibold text-foreground">Achievements</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <h4 className="font-medium text-foreground text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </LuxuryCard>

            {/* Smart Recommendations */}
            <LuxuryCard className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="flex items-center mb-3">
                <Lightbulb className="text-accent mr-2" size={20} />
                <h3 className="font-playfair font-semibold text-foreground">Smart Recommendations</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Since you saved Betla Safari, check out Netarhat Eco Retreat for your next adventure!
              </p>
              <Button variant="outline" size="sm" className="text-primary border-primary">
                View Recommendations
              </Button>
            </LuxuryCard>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {favorites.map((item) => (
                <LuxuryCard key={item.id} className="p-3">
                  <div className="aspect-square bg-muted rounded-lg mb-2">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <Badge variant="outline" className="text-xs mb-1">{item.type}</Badge>
                  <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                </LuxuryCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            {bookings.map((booking) => (
              <LuxuryCard key={booking.id}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <Badge variant="outline" className="text-xs mb-1">{booking.type}</Badge>
                    <h4 className="font-medium text-foreground">{booking.name}</h4>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  </div>
                  <Badge 
                    variant={booking.status === "Confirmed" ? "default" : "secondary"}
                    className={booking.status === "Confirmed" ? "bg-success text-success-foreground" : ""}
                  >
                    {booking.status}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </LuxuryCard>
            ))}
          </TabsContent>

          <TabsContent value="contributions" className="space-y-4">
            {contributions.map((contribution) => (
              <LuxuryCard key={contribution.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="text-xs mb-1">{contribution.type}</Badge>
                    <h4 className="font-medium text-foreground">{contribution.name}</h4>
                  </div>
                  <Badge 
                    variant={contribution.status === "Approved" ? "default" : "secondary"}
                    className={contribution.status === "Approved" ? "bg-success text-success-foreground" : "bg-accent/10 text-accent"}
                  >
                    {contribution.status}
                  </Badge>
                </div>
              </LuxuryCard>
            ))}
            
            <LuxuryCard className="text-center bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
              <Plus className="mx-auto text-accent mb-2" size={24} />
              <h3 className="font-playfair font-semibold text-foreground mb-1">
                Share Your Experience
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                List your events, products, or services
              </p>
              <Button variant="outline" className="text-accent border-accent">
                Add Contribution
              </Button>
            </LuxuryCard>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            {/* Language Settings */}
            <LuxuryCard>
              <div className="flex items-center mb-4">
                <Globe className="text-primary mr-2" size={20} />
                <h3 className="font-playfair font-semibold text-foreground">{t("profile.language")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang}
                    variant={selectedLanguage === lang ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLanguageChange(lang)}
                    className="text-xs"
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </LuxuryCard>

            {/* Accessibility Settings */}
            <LuxuryCard>
              <div className="flex items-center mb-4">
                <Accessibility className="text-primary mr-2" size={20} />
                <h3 className="font-playfair font-semibold text-foreground">Accessibility</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Font Size</p>
                    <p className="text-sm text-muted-foreground">Adjust text size for better readability</p>
                  </div>
                  <div className="flex gap-1">
                    {fontSizes.map((size) => (
                      <Button
                        key={size}
                        variant={fontSize === size.toLowerCase() ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFontSize(size.toLowerCase())}
                        className="text-xs"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">High Contrast</p>
                    <p className="text-sm text-muted-foreground">Improve visibility</p>
                  </div>
                  <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Voice Assistance</p>
                    <p className="text-sm text-muted-foreground">Enable voice commands</p>
                  </div>
                  <Switch checked={voiceAssist} onCheckedChange={setVoiceAssist} />
                </div>
              </div>
            </LuxuryCard>

            {/* Theme Settings */}
            <LuxuryCard>
              <div className="flex items-center mb-4">
                <Settings className="text-primary mr-2" size={20} />
                <h3 className="font-playfair font-semibold text-foreground">Theme</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sun className="text-accent mr-2" size={16} />
                  <span className="font-medium text-foreground">Dark Mode</span>
                  <Moon className="text-primary ml-2" size={16} />
                </div>
                <DarkModeToggle />
              </div>
            </LuxuryCard>

            {/* Safety Hub */}
            <LuxuryCard className="bg-gradient-to-r from-destructive/5 to-accent/5 border-destructive/20">
              <div className="flex items-center mb-4">
                <Shield className="text-destructive mr-2" size={20} />
                <h3 className="font-playfair font-semibold text-foreground">Safety Hub</h3>
              </div>
              
              {/* SOS Button */}
              <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground mb-4">
                <AlertTriangle size={20} className="mr-2" />
                Emergency SOS
              </Button>
              
              {/* Quick Dial */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">Quick Dial</h4>
                <div className="grid grid-cols-2 gap-2">
                  {emergencyContacts.map((contact, index) => (
                    <Button key={index} variant="outline" size="sm" className="text-xs">
                      <Phone size={12} className="mr-1" />
                      {contact.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Trusted Contacts */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">Trusted Contacts</h4>
                {trustedContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-2 mb-2">
                    <div>
                      <p className="font-medium text-foreground text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.relation}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Phone size={12} />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <Plus size={12} className="mr-1" />
                  Add Contact
                </Button>
              </div>
              
              {/* Safety Tips */}
              <div className="bg-muted rounded-lg p-3">
                <h4 className="font-medium text-foreground mb-1">Safety Tips</h4>
                <p className="text-xs text-muted-foreground">
                  • Share your travel plans with trusted contacts
                  • Keep emergency numbers handy
                  • Stay aware of your surroundings
                </p>
              </div>
            </LuxuryCard>

            {/* Data Management */}
            <LuxuryCard>
              <h3 className="font-playfair font-semibold text-foreground mb-4">Data Management</h3>
              <Button variant="outline" className="w-full text-destructive border-destructive">
                <Trash2 size={16} className="mr-2" />
                Clear Local Data
              </Button>
            </LuxuryCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}