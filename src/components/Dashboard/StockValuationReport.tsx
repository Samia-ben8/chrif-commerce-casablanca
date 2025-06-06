
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const stockData = [
  { 
    category: 'Agriculture',
    totalItems: 145,
    value: 58600,
    status: 'normal'
  },
  { 
    category: 'Quincaillerie',
    totalItems: 87, 
    value: 34800,
    status: 'normal'
  },
  { 
    category: 'Peinture',
    totalItems: 63, 
    value: 25200,
    status: 'low'
  },
  { 
    category: 'Droguerie',
    totalItems: 92, 
    value: 36800,
    status: 'normal'
  },
];

const StockValuationReport = () => {
  const totalValue = stockData.reduce((sum, item) => sum + item.value, 0);
  const totalItems = stockData.reduce((sum, item) => sum + item.totalItems, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valorisation des stocks</CardTitle>
        <CardDescription>Valeur actuelle du stock par catégorie</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Valeur totale</p>
            <p className="text-2xl font-bold">{totalValue.toLocaleString()} DH</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total articles</p>
            <p className="text-2xl font-bold">{totalItems}</p>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Catégorie</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Valeur (DH)</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockData.map((item) => (
              <TableRow key={item.category}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell>{item.totalItems}</TableCell>
                <TableCell>{item.value.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === 'low' ? 'destructive' : 'outline'}
                  >
                    {item.status === 'low' ? 'Stock faible' : 'Normal'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StockValuationReport;
