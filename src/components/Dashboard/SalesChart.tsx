
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
  const data = [
    { month: 'Jan', sales: 12000 },
    { month: 'Fév', sales: 15000 },
    { month: 'Mar', sales: 18000 },
    { month: 'Avr', sales: 14000 },
    { month: 'Mai', sales: 22000 },
    { month: 'Jun', sales: 25000 },
    { month: 'Jul', sales: 28000 },
    { month: 'Aoû', sales: 24000 },
    { month: 'Sep', sales: 26000 },
    { month: 'Oct', sales: 30000 },
    { month: 'Nov', sales: 32000 },
    { month: 'Déc', sales: 35000 }
  ];

  const chartConfig = {
    sales: {
      label: "Ventes",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution des ventes</CardTitle>
        <CardDescription>Ventes mensuelles en DH</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="var(--color-sales)"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
