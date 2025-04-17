
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockObjectives, mockRoadmapItems } from "@/data/mockData";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const Dashboard = () => {
  // Calculate OKR progress
  const calculateProgress = () => {
    let totalProgress = 0;
    let countKeyResults = 0;

    mockObjectives.forEach(objective => {
      objective.keyResults.forEach(kr => {
        const progress = Math.min(100, Math.max(0, 
          (kr.currentValue / kr.targetValue) * 100));
        totalProgress += progress;
        countKeyResults += 1;
      });
    });

    return countKeyResults > 0 ? totalProgress / countKeyResults : 0;
  };

  const okrProgress = calculateProgress();

  // Prepare chart data for roadmap status
  const roadmapStatusData = [
    { name: "Not Started", value: mockRoadmapItems.filter(item => item.status === "Not Started").length },
    { name: "In Progress", value: mockRoadmapItems.filter(item => item.status === "In Progress").length },
    { name: "Completed", value: mockRoadmapItems.filter(item => item.status === "Completed").length },
    { name: "Blocked", value: mockRoadmapItems.filter(item => item.status === "Blocked").length },
  ];

  // Configuration for chart
  const chartConfig = {
    notStarted: { color: "#94a3b8" },  // slate-400
    inProgress: { color: "#3b82f6" },  // blue-500
    completed: { color: "#22c55e" },   // green-500
    blocked: { color: "#ef4444" },     // red-500
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>OKR Progress</CardTitle>
          <CardDescription>Overall progress toward all objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Overall Progress</div>
                <div className="font-medium">{Math.round(okrProgress)}%</div>
              </div>
              <Progress value={okrProgress} />
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Top Objectives</h4>
              <ul className="space-y-3">
                {mockObjectives.slice(0, 3).map(objective => (
                  <li key={objective.id} className="text-sm">
                    <div className="font-medium">{objective.statement}</div>
                    <div className="text-muted-foreground">{objective.quarter} • {objective.owner}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Roadmap Status</CardTitle>
          <CardDescription>Distribution of roadmap items by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ChartContainer
              config={chartConfig}
              className="h-full"
            >
              <BarChart data={roadmapStatusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Items" fill="#3b82f6" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-2 border-blue-500 pl-4 py-1">
              <p className="font-medium">EPIC-101: Onboarding Redesign moved to In Progress</p>
              <p className="text-sm text-muted-foreground">2 hours ago • Sarah Johnson</p>
            </div>
            <div className="border-l-2 border-green-500 pl-4 py-1">
              <p className="font-medium">July 2025 Release planning completed</p>
              <p className="text-sm text-muted-foreground">Yesterday • Michael Chen</p>
            </div>
            <div className="border-l-2 border-purple-500 pl-4 py-1">
              <p className="font-medium">New OKR created: Improve user retention</p>
              <p className="text-sm text-muted-foreground">2 days ago • Sarah Johnson</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
