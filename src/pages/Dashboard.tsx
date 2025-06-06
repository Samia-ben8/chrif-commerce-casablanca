
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardStats from '@/components/Dashboard/DashboardStats';
import RecentOrders from '@/components/Dashboard/RecentOrders';
import UserProfile from '@/components/Dashboard/UserProfile';
import UserSettings from '@/components/Dashboard/UserSettings';
import SalesChart from '@/components/Dashboard/SalesChart';
import TopProductsChart from '@/components/Dashboard/TopProductsChart';
import StockEvolutionChart from '@/components/Dashboard/StockEvolutionChart';
import StockValuationReport from '@/components/Dashboard/StockValuationReport';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('apercu');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-4 h-auto">
              <TabsTrigger value="apercu" className="py-2">Aperçu</TabsTrigger>
              <TabsTrigger value="statistiques" className="py-2">Statistiques</TabsTrigger>
              <TabsTrigger value="commandes" className="py-2">Commandes</TabsTrigger>
              <TabsTrigger value="compte" className="py-2">Mon Compte</TabsTrigger>
            </TabsList>

            <TabsContent value="apercu" className="space-y-6">
              <DashboardStats />
              <RecentOrders />
            </TabsContent>

            <TabsContent value="statistiques" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SalesChart />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TopProductsChart />
                <StockEvolutionChart />
              </div>
              <StockValuationReport />
            </TabsContent>

            <TabsContent value="commandes" className="space-y-6">
              <RecentOrders showAll={true} />
            </TabsContent>

            <TabsContent value="compte" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <UserProfile />
                </div>
                <div className="md:col-span-2">
                  <UserSettings />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
