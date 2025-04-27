
import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import { ChartLine, BarChart as BarChartIcon, Activity, Users } from 'lucide-react';

const mockData = {
  daily: [
    { date: '2024-04-21', descriptions: 12, editTime: 5, edits: 8 },
    { date: '2024-04-22', descriptions: 15, editTime: 4, edits: 10 },
    { date: '2024-04-23', descriptions: 8, editTime: 6, edits: 5 },
    { date: '2024-04-24', descriptions: 20, editTime: 3, edits: 12 },
    { date: '2024-04-25', descriptions: 18, editTime: 4, edits: 15 },
    { date: '2024-04-26', descriptions: 25, editTime: 3, edits: 18 },
    { date: '2024-04-27', descriptions: 22, editTime: 4, edits: 16 },
  ]
};

const statsData = [
  {
    title: "Total Descriptions",
    value: "120",
    description: "Generated this month",
    icon: Activity,
  },
  {
    title: "Active Users",
    value: "12",
    description: "Last 7 days",
    icon: Users,
  },
  {
    title: "Average Edit Time",
    value: "4.1 min",
    description: "Per description",
    icon: ChartLine,
  },
  {
    title: "Export Success Rate",
    value: "98%",
    description: "Last 30 days",
    icon: BarChartIcon,
  },
];

export default function Analytics() {
  const { toast } = useToast();
  const [isTrackingEnabled, setIsTrackingEnabled] = React.useState(true);

  const handleTrackingChange = (checked: boolean) => {
    setIsTrackingEnabled(checked);
    toast({
      title: checked ? "Analytics tracking enabled" : "Analytics tracking disabled",
      description: checked 
        ? "You're helping us improve the platform" 
        : "Your usage will no longer be tracked",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isTrackingEnabled}
            onCheckedChange={handleTrackingChange}
            id="analytics-tracking"
          />
          <Label htmlFor="analytics-tracking">Enable Analytics Tracking</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Descriptions Generated</CardTitle>
            <CardDescription>Daily generation trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <LineChart data={mockData.daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="descriptions" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Editing Activity</CardTitle>
            <CardDescription>Edits per description</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={mockData.daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="edits" fill="#8B5CF6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
