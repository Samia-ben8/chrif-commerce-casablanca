
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Données d'exemple pour les ventes mensuelles
const data = [
  { name: 'Jan', ventes: 4000 },
  { name: 'Fév', ventes: 3000 },
  { name: 'Mar', ventes: 5000 },
  { name: 'Avr', ventes: 2780 },
  { name: 'Mai', ventes: 1890 },
  { name: 'Juin', ventes: 2390 },
  { name: 'Juil', ventes: 3490 },
  { name: 'Août', ventes: 2000 },
  { name: 'Sep', ventes: 2780 },
  { name: 'Oct', ventes: 1890 },
  { name: 'Nov', ventes: 3578 },
  { name: 'Déc', ventes: 3908 },
];

const SalesChart = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Évolution des ventes</CardTitle>
        <CardDescription>Aperçu des ventes mensuelles pour l'année en cours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()} DH`, 'Ventes']}
                labelFormatter={(label) => `Mois: ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="ventes" 
                name="Ventes"
                stroke="hsl(142, 77%, 30%)" 
                fill="hsl(142, 77%, 90%)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
