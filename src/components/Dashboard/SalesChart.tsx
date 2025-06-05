
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
      color: "#22C55E",
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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#22C55E"
                strokeWidth={3}
                dot={{ r: 5, fill: "#22C55E" }}
                activeDot={{ r: 7, fill: "#16A34A" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
