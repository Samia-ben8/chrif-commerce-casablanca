
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TopProductsChart = () => {
  const data = [
    { name: 'Peinture blanche', value: 35, color: '#8884d8' },
    { name: 'Tuyaux PVC', value: 25, color: '#82ca9d' },
    { name: 'Vis & Clous', value: 20, color: '#ffc658' },
    { name: 'Câbles électriques', value: 15, color: '#ff7300' },
    { name: 'Autres', value: 5, color: '#8dd1e1' }
  ];

  const chartConfig = {
    value: {
      label: "Ventes (%)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits les plus vendus</CardTitle>
        <CardDescription>Répartition des ventes par produit</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
