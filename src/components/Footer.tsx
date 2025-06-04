
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Informations du magasin */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DC</span>
              </div>
              <h3 className="font-bold text-lg text-primary">Droguerie CHRIF</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Votre partenaire de confiance pour tous vos besoins en droguerie, 
              quincaillerie, agriculture et peinture à Casablanca.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Liens Rapides</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link to="/boutique" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Boutique
              </Link>
              <Link to="/categories" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Catégories
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Catégories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Nos Catégories</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Agriculture</p>
              <p className="text-sm text-muted-foreground">Droguerie</p>
              <p className="text-sm text-muted-foreground">Quincaillerie</p>
              <p className="text-sm text-muted-foreground">Peinture</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  HCQ3+R96, Rue Mohamed El Radi Slaoui<br />
                  Casablanca 20250, Maroc
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">+212 6XX XXX XXX</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Lun-Sam: 8h-18h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Droguerie CHRIF. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button className="gradient-primary text-primary-foreground">
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
