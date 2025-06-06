
import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone } from 'lucide-react';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      try {
        // Coordonnées de Casablanca Maarif
        const storeLocation = { lat: 33.5892, lng: -7.6327 };
        
        // @ts-ignore - Le type window.google n'existe pas sans le chargement du script
        const map = new window.google.maps.Map(mapRef.current, {
          center: storeLocation,
          zoom: 15,
          mapTypeControl: false,
          fullscreenControl: false,
        });
        
        // @ts-ignore
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          position: storeLocation,
          map: map,
          title: 'Droguerie CHRIF',
        });
        
        // @ts-ignore
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold text-lg">Droguerie CHRIF</h3>
              <p>Rue Mohamed El Radi Slaoui, Casablanca</p>
              <p>Tél: +212 522 240 501</p>
            </div>
          `,
        });
        
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de Google Maps:', error);
        setMapError(true);
      }
    };

    // Gestionnaire d'erreur pour les erreurs Google Maps
    const handleMapError = () => {
      console.error('Erreur Google Maps API');
      setMapError(true);
    };

    // Écouter les erreurs globales de Google Maps
    window.addEventListener('error', handleMapError);

    // Chargement du script Google Maps avec une clé API publique de démonstration
    if (!window.google) {
      const script = document.createElement('script');
      // Utilisation d'une iframe Google Maps intégrée comme fallback
      script.onerror = () => {
        console.error('Impossible de charger Google Maps');
        setMapError(true);
      };
      
      // Essayer de charger Google Maps (nécessite une clé API valide)
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initMap&loading=async`;
      script.async = true;
      script.defer = true;
      
      window.initMap = initMap;
      
      // Simuler une erreur de clé API pour afficher le fallback
      setTimeout(() => {
        setMapError(true);
      }, 2000);
      
      document.head.appendChild(script);
    } else {
      initMap();
    }
    
    return () => {
      window.removeEventListener('error', handleMapError);
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  // Fallback avec carte intégrée Google Maps
  if (mapError) {
    return (
      <div className="w-full h-full bg-muted rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8573736829647!2d-7.635490684479654!3d33.58919578073425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0x5950b6d1f40a24c3!2sRue%20Mohamed%20El%20Radi%20Slaoui%2C%20Casablanca%2020250%2C%20Morocco!5e0!3m2!1sen!2sus!4v1685123456789!5m2!1sen!2sus"
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
  }

  return (
    <div ref={mapRef} className="w-full h-full" />
  );
};

// Définir initMap comme propriété globale de window
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

export default MapComponent;
