
import { useEffect, useRef } from 'react';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

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
      const marker = new window.google.maps.Marker({
        position: storeLocation,
        map: map,
        title: 'Droguerie CHRIF',
        animation: window.google.maps.Animation.DROP,
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
    };

    // Chargement du script Google Maps
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBGaww5hCk4qmev9v1KPPAX-le1dZmQlOI&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
    
    return () => {
      // Supprimer la fonction globale après utilisation
      delete window.initMap;
    };
  }, []);

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
