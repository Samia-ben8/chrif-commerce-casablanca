
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
    </div>
  );
};

export default MapComponent;
