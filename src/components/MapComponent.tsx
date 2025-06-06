
import { MapPin, Phone } from 'lucide-react';

const MapComponent = () => {
  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.6074428742254!2d-7.599197924631052!3d33.58954027333474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd5c5d634739%3A0xa1e85b9d23d15036!2sDroguerie%20CHRIF!5e0!3m2!1sfr!2sma!4v1749196825080!5m2!1sfr!2sma"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Droguerie CHRIF Location"
      />
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg max-w-xs">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Droguerie CHRIF</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          Rue Mohamed El Radi Slaoui, Casablanca
        </p>
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-primary" />
          <p className="text-sm">+212 522 240 501</p>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
