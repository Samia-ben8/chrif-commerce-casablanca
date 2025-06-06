
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HeroSection from '@/components/Home/HeroSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import FeaturedProductsSection from '@/components/Home/FeaturedProductsSection';
import LocationSection from '@/components/Home/LocationSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection />
      <LocationSection />
      <WhatsAppButton phoneNumber="212688503615" />
      <Footer />
    </div>
  );
};

export default Index;
