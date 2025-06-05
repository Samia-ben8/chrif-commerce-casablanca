
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import DashboardStats from '@/components/Dashboard/DashboardStats';
import RecentOrders from '@/components/Dashboard/RecentOrders';
import UserProfile from '@/components/Dashboard/UserProfile';
import UserSettings from '@/components/Dashboard/UserSettings';
import SalesChart from '@/components/Dashboard/SalesChart';
import TopProductsChart from '@/components/Dashboard/TopProductsChart';
import StockEvolutionChart from '@/components/Dashboard/StockEvolutionChart';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - replace with real data later
  const orders = [
    {
      id: 'CMD-001',
      date: '2024-01-15',
      status: 'confirmée' as const,
      total: 245.50,
      items: 3
    },
    {
      id: 'CMD-002',
      date: '2024-01-10',
      status: 'en attente' as const,
      total: 120.00,
      items: 2
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue {user?.name}</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="orders">Commandes</TabsTrigger>
              <TabsTrigger value="statistics">Statistiques</TabsTrigger>
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <DashboardStats orders={orders} />
              <RecentOrders orders={orders.slice(0, 3)} showViewAllButton={true} />
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <RecentOrders orders={orders} />
            </TabsContent>

            <TabsContent value="statistics" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <SalesChart />
                <TopProductsChart />
              </div>
              <StockEvolutionChart />
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <UserProfile user={user} />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <UserSettings />
            </TabsContent>
          </Tabs>
        </div>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
