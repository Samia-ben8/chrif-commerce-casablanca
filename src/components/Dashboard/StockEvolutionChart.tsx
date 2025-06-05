
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const StockEvolutionChart = () => {
  const data = [
    { category: 'Peinture', stock: 120, restocked: 80 },
    { category: 'Plomberie', stock: 85, restocked: 60 },
    { category: 'Électricité', stock: 95, restocked: 45 },
    { category: 'Quincaillerie', stock: 200, restocked: 150 },
    { category: 'Jardinage', stock: 65, restocked: 30 },
    { category: 'Automobile', stock: 40, restocked: 25 }
  ];

  const chartConfig = {
    stock: {
      label: "Stock actuel",
      color: "hsl(var(--chart-1))",
    },
    restocked: {
      label: "Réapprovisionné",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution du stock</CardTitle>
        <CardDescription>Stock actuel vs réapprovisionné par catégorie</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="stock" fill="var(--color-stock)" />
            <Bar dataKey="restocked" fill="var(--color-restocked)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StockEvolutionChart;
