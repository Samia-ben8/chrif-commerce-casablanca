
import { Button } from '@/components/ui/button';
import MapComponent from '@/components/MapComponent';
import { MapPin, Clock, Phone } from 'lucide-react';

const LocationSection = () => {
  return (
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
                  <p className="text-muted-foreground">+212 522 240 501</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button 
                size="lg" 
                className="gradient-primary text-primary-foreground"
                onClick={() => window.open(`https://wa.me/212688503615`, '_blank')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Contacter par WhatsApp
              </Button>
            </div>
          </div>

          <div className="h-96 rounded-lg overflow-hidden animate-scale-in">
            <MapComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
