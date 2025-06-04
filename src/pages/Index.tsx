
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShoppingCart,
  Truck,
  Shield,
  Star,
  ArrowRight
} from 'lucide-react';

// Données d'exemple - À remplacer par des données réelles plus tard
const featuredProducts = [
  {
    id: '1',
    name: 'Tuyau goutte à goutte 16mm - 100m',
    price: 245,
    image: '/placeholder.svg',
    category: 'Agriculture',
    stock: 12,
    description: 'Tuyau d\'irrigation goutte à goutte de qualité professionnelle'
  },
  {
    id: '2',
    name: 'Insecticide Anti-Pucerons 500ml',
    price: 85,
    image: '/placeholder.svg',
    category: 'Agriculture',
    stock: 8,
    description: 'Traitement efficace contre les pucerons et parasites'
  },
  {
    id: '3',
    name: 'Pompe à eau manuelle 5L',
    price: 320,
    image: '/placeholder.svg',
    category: 'Quincaillerie',
    stock: 5,
    description: 'Pompe à eau portable pour usage domestique'
  },
  {
    id: '4',
    name: 'Peinture décorative blanche 2.5L',
    price: 180,
    image: '/placeholder.svg',
    category: 'Peinture',
    stock: 15,
    description: 'Peinture murale de haute qualité, finition mate'
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Bienvenue chez Droguerie CHRIF",
      subtitle: "Votre partenaire de confiance depuis plus de 20 ans",
      description: "Découvrez notre large gamme de produits pour l'agriculture, la quincaillerie, la droguerie et la peinture",
      image: "/placeholder.svg"
    },
    {
      title: "Équipement Agricole Professionnel",
      subtitle: "Systèmes d'irrigation et traitement des cultures",
      description: "Tuyaux goutte à goutte, insecticides et équipements pour optimiser vos récoltes",
      image: "/placeholder.svg"
    },
    {
      title: "Pompes à Eau & Quincaillerie",
      subtitle: "Solutions complètes pour vos besoins domestiques",
      description: "Pompes électriques et manuelles de 2L à 20L, cordes pour puits et plus",
      image: "/placeholder.svg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product: any) => {
    console.log('Ajout au panier:', product);
    // Logique du panier à implémenter plus tard
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section avec Carousel */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full bg-gradient-to-br from-primary/90 to-accent/90">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white animate-fade-in-up">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <h2 className="text-xl md:text-2xl mb-6 text-white/90">{slide.subtitle}</h2>
                  <p className="text-lg mb-8 text-white/80">{slide.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                      <Link to="/boutique">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Voir la boutique
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      <Phone className="mr-2 h-5 w-5" />
                      Nous contacter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow animate-scale-in">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Livraison Casablanca</h3>
                <p className="text-muted-foreground">Livraison rapide dans toute la région de Casablanca</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow animate-scale-in">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Qualité Garantie</h3>
                <p className="text-muted-foreground">Produits authentiques et de qualité professionnelle</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow animate-scale-in">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">20+ Ans d'Expérience</h3>
                <p className="text-muted-foreground">Une expertise reconnue dans notre domaine</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Produits Populaires</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez une sélection de nos produits les plus demandés dans toutes nos catégories
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground">
              <Link to="/boutique">
                Voir tous les produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Magasin</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-muted-foreground">
                      HCQ3+R96, Rue Mohamed El Radi Slaoui<br />
                      Casablanca 20250, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Horaires d'ouverture</h3>
                    <p className="text-muted-foreground">
                      Lundi - Samedi: 8h00 - 18h00<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Contact</h3>
                    <p className="text-muted-foreground">+212 6XX XXX XXX</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg" className="gradient-primary text-primary-foreground">
                  <Phone className="mr-2 h-5 w-5" />
                  Contacter par WhatsApp
                </Button>
              </div>
            </div>

            <div className="h-96 bg-muted rounded-lg overflow-hidden animate-scale-in">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium">Carte Google Maps</p>
                  <p className="text-sm text-muted-foreground">
                    Localisation du magasin à venir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
