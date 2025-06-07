
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Phone } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Bienvenue chez Droguerie CHRIF",
      subtitle: "Votre partenaire de confiance depuis plus de 20 ans",
      description: "Découvrez notre large gamme de produits pour l'agriculture, la quincaillerie, la droguerie et la peinture",
      backgroundImage: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Équipement Agricole Professionnel",
      subtitle: "Systèmes d'irrigation et traitement des cultures",
      description: "Tuyaux goutte à goutte, insecticides et équipements pour optimiser vos récoltes",
      backgroundImage: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Pompes à Eau & Quincaillerie",
      subtitle: "Solutions complètes pour vos besoins domestiques",
      description: "Pompes électriques et manuelles de 2L à 20L, cordes pour puits et plus",
      backgroundImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="relative h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
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
                  <Button asChild variant="outline" size="lg" className="bg-black text-green-500 border-green-500 hover:bg-black/90">
                    <Link to="/contact">
                      <Phone className="mr-2 h-5 w-5" />
                      Nous contacter
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
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
  );
};

export default HeroSection;
