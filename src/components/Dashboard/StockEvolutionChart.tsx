
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Données d'exemple pour l'évolution du stock
const data = [
  { name: 'Jan', stock: 400 },
  { name: 'Fév', stock: 360 },
  { name: 'Mar', stock: 290 },
  { name: 'Avr', stock: 340 },
  { name: 'Mai', stock: 230 },
  { name: 'Juin', stock: 380 },
  { name: 'Juil', stock: 420 },
  { name: 'Août', stock: 380 },
  { name: 'Sep', stock: 310 },
  { name: 'Oct', stock: 280 },
  { name: 'Nov', stock: 250 },
  { name: 'Déc', stock: 310 },
];

const StockEvolutionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution du stock</CardTitle>
        <CardDescription>Valeur totale du stock par mois</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value.toLocaleString()} produits`, 'Stock']}
                labelFormatter={(label) => `Mois: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="stock"
                name="Stock"
                stroke="hsl(142, 77%, 30%)"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockEvolutionChart;
