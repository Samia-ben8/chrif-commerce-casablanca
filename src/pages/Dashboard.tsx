
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { useAuth } from '@/contexts/AuthContext';

// Mock orders data
const mockOrders = [
  {
    id: 'CMD-001',
    date: '2024-06-05',
    status: 'confirmée' as const,
    total: 1250.50,
    items: 3
  },
  {
    id: 'CMD-002',
    date: '2024-06-04',
    status: 'en attente' as const,
    total: 890.25,
    items: 2
  },
  {
    id: 'CMD-003',
    date: '2024-06-03',
    status: 'expédiée' as const,
    total: 2340.75,
    items: 5
  },
  {
    id: 'CMD-004',
    date: '2024-06-02',
    status: 'livrée' as const,
    total: 567.80,
    items: 1
  }
];

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('apercu');
  const { user } = useAuth();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

          <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="mb-6">
            <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-4' : 'grid-cols-3'} h-auto`}>
              <TabsTrigger value="apercu" className="py-2">Aperçu</TabsTrigger>
              {isAdmin && <TabsTrigger value="statistiques" className="py-2">Statistiques</TabsTrigger>}
              <TabsTrigger value="commandes" className="py-2">Commandes</TabsTrigger>
              <TabsTrigger value="compte" className="py-2">Mon Compte</TabsTrigger>
            </TabsList>

            <TabsContent value="apercu" className="space-y-6">
              <DashboardStats orders={mockOrders} />
              <RecentOrders orders={mockOrders.slice(0, 3)} showViewAllButton={true} />
            </TabsContent>

            {isAdmin && (
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
            )}

            <TabsContent value="commandes" className="space-y-6">
              <RecentOrders orders={mockOrders} showViewAllButton={false} />
            </TabsContent>

            <TabsContent value="compte" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <UserProfile user={user} />
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
