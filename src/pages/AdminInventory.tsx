
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminRoute from '@/components/Auth/AdminRoute';
import { Package, TrendingUp, TrendingDown, AlertTriangle, Download } from 'lucide-react';

const AdminInventory = () => {
  // Mock data - replace with real data later
  const inventoryData = {
    totalSales: 285000,
    initialStockValue: 150000,
    currentStockValue: 98000,
    losses: 12000,
    profit: 125000
  };

  const categories = [
    {
      name: 'Peinture',
      initialValue: 45000,
      currentValue: 28000,
      sales: 52000,
      losses: 3000,
      profit: 32000
    },
    {
      name: 'Plomberie',
      initialValue: 35000,
      currentValue: 22000,
      sales: 48000,
      losses: 2500,
      profit: 32500
    },
    {
      name: 'Électricité',
      initialValue: 28000,
      currentValue: 18000,
      sales: 38000,
      losses: 1800,
      profit: 26200
    },
    {
      name: 'Quincaillerie',
      initialValue: 25000,
      currentValue: 20000,
      sales: 32000,
      losses: 2000,
      profit: 25000
    },
    {
      name: 'Jardinage',
      initialValue: 12000,
      currentValue: 7000,
      sales: 18000,
      losses: 1500,
      profit: 11500
    },
    {
      name: 'Automobile',
      initialValue: 5000,
      currentValue: 3000,
      sales: 8000,
      losses: 1200,
      profit: 4800
    }
  ];

  const getStatusIcon = (profit: number) => {
    if (profit > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (profit < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
  };

  const getStatusColor = (profit: number) => {
    if (profit > 0) return 'bg-green-100 text-green-800';
    if (profit < 0) return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <AdminRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Inventaire de fin d'année</h1>
              <p className="text-muted-foreground">Bilan complet et analyse des performances</p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exporter le rapport
            </Button>
          </div>

          {/* Résumé global */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {inventoryData.totalSales.toLocaleString()} DH
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stock initial</CardTitle>
                <Package className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {inventoryData.initialStockValue.toLocaleString()} DH
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stock actuel</CardTitle>
                <Package className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {inventoryData.currentStockValue.toLocaleString()} DH
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pertes</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {inventoryData.losses.toLocaleString()} DH
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bénéfice net</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {inventoryData.profit.toLocaleString()} DH
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Détail par catégorie */}
          <Card>
            <CardHeader>
              <CardTitle>Bilan par catégorie</CardTitle>
              <CardDescription>
                Analyse détaillée des performances de chaque catégorie de produits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Stock initial</TableHead>
                      <TableHead>Stock actuel</TableHead>
                      <TableHead>Ventes</TableHead>
                      <TableHead>Pertes</TableHead>
                      <TableHead>Bénéfice</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.name}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.initialValue.toLocaleString()} DH</TableCell>
                        <TableCell>{category.currentValue.toLocaleString()} DH</TableCell>
                        <TableCell className="text-green-600">
                          {category.sales.toLocaleString()} DH
                        </TableCell>
                        <TableCell className="text-red-600">
                          {category.losses.toLocaleString()} DH
                        </TableCell>
                        <TableCell className="font-medium">
                          {category.profit.toLocaleString()} DH
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(category.profit)}
                            <Badge className={getStatusColor(category.profit)}>
                              {category.profit > 0 ? 'Rentable' : category.profit < 0 ? 'Déficitaire' : 'Équilibré'}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Recommandations */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recommandations</CardTitle>
              <CardDescription>
                Actions suggérées basées sur l'analyse de l'inventaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Excellente performance</h4>
                    <p className="text-sm text-green-700">
                      Les catégories Peinture et Plomberie montrent d'excellents résultats. 
                      Considérez augmenter le stock pour ces catégories.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Attention requise</h4>
                    <p className="text-sm text-yellow-700">
                      Les pertes dans la catégorie Peinture sont élevées. 
                      Vérifiez les dates d'expiration et les conditions de stockage.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Optimisation du stock</h4>
                    <p className="text-sm text-blue-700">
                      La rotation du stock en Automobile est lente. 
                      Considérez des promotions pour écouler le stock existant.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </div>
    </AdminRoute>
  );
};

export default AdminInventory;
