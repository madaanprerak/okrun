
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, 
  CartesianGrid, PieChart, Pie, Cell 
} from "recharts";
import { 
  AlignCenter, ArrowRight, Brain, CheckCircle2, CircleAlert, Eye, 
  Lightbulb, LineChart as LineChartIcon, ListChecks, Sparkles, Zap 
} from "lucide-react";
import { mockAIRecommendations } from "@/data/mockData";

const AIInsightsView = () => {
  // Dummy data for charts
  const metricsData = [
    { month: 'Jan', userRetention: 65, nps: 72 },
    { month: 'Feb', userRetention: 67, nps: 70 },
    { month: 'Mar', userRetention: 70, nps: 73 },
    { month: 'Apr', userRetention: 68, nps: 75 },
    { month: 'May', userRetention: 72, nps: 78 }
  ];
  
  const alignmentData = [
    { name: 'Aligned', value: 68 },
    { name: 'Partially Aligned', value: 22 },
    { name: 'Misaligned', value: 10 }
  ];
  
  const colors = ['#22c55e', '#eab308', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Insights & Intelligence</h2>
          <p className="text-muted-foreground">AI-powered analytics and suggestions for your product execution</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800 flex items-center">
          <Brain className="mr-1 h-4 w-4" /> AI Powered
        </Badge>
      </div>
      
      <Tabs defaultValue="insights" className="w-full">
        <TabsList>
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
          <TabsTrigger value="metrics">OKR Metrics</TabsTrigger>
          <TabsTrigger value="alignment">Strategy Alignment</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="md:col-span-2 bg-slate-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-600" /> 
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Based on our analysis of your product execution data, we have identified the following key insights:</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 shrink-0" />
                    <span>Your team is on track to meet 73% of Q3 objectives, with notable progress in user retention and activation metrics.</span>
                  </li>
                  <li className="flex items-start">
                    <CircleAlert className="h-5 w-5 mr-2 text-amber-600 shrink-0" />
                    <span>There's a potential misalignment between the "Improve user onboarding" OKR and the backlog items currently prioritized.</span>
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="h-5 w-5 mr-2 text-blue-600 shrink-0" />
                    <span>Based on customer feedback analysis, we recommend shifting priority to the mobile onboarding experience improvements.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <LineChartIcon className="mr-2 h-5 w-5 text-blue-600" /> 
                  Key Metrics Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metricsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="userRetention" stroke="#3b82f6" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="nps" stroke="#8b5cf6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Trending upward by 7% over the last quarter</p>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <AlignCenter className="mr-2 h-5 w-5 text-green-600" /> 
                  Strategy-Execution Alignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={alignmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {alignmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">68% of roadmap items directly contribute to OKRs</p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">OKR Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">User Retention</CardTitle>
                  <CardDescription>Key Result 1 for OKR-Q3-01</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">72%</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <Zap className="h-3 w-3 mr-1" /> +4% from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">NPS Score</CardTitle>
                  <CardDescription>Key Result 2 for OKR-Q3-01</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <Zap className="h-3 w-3 mr-1" /> +3 from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Feature Adoption</CardTitle>
                  <CardDescription>Key Result 1 for OKR-Q3-02</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">43%</div>
                  <div className="flex items-center text-amber-600 text-sm">
                    <Zap className="h-3 w-3 mr-1" /> +1% from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Revenue Growth</CardTitle>
                  <CardDescription>Key Result 3 for OKR-Q3-03</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">18%</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <Zap className="h-3 w-3 mr-1" /> +2% from last month
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <h3 className="text-lg font-medium mt-8">Detailed Metrics Trends</h3>
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Metrics Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metricsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="userRetention" fill="#3b82f6" />
                      <Bar dataKey="nps" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="alignment" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    <Eye className="inline mr-2 h-5 w-5" /> Strategy Alignment Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">OKR Coverage</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Percentage of roadmap items linked to OKRs</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Resource Alignment</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Team resources allocated to OKR-linked work</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Timeline Alignment</span>
                        <span className="text-sm font-medium">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Roadmap items on track with OKR timelines</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    <ListChecks className="inline mr-2 h-5 w-5" /> Alignment by Objective
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Improve user retention</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Increase feature adoption</span>
                        <span className="text-sm font-medium">64%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Optimize onboarding</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <CircleAlert className="mr-2 h-5 w-5 text-amber-600" /> 
                  Alignment Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CircleAlert className="h-4 w-4 mr-2 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">OKR-Q3-02: Optimize onboarding</p>
                      <p className="text-xs text-muted-foreground">Has insufficient roadmap items to meet targets (45% coverage)</p>
                      <Button size="sm" variant="outline" className="mt-1">
                        <ArrowRight className="mr-1 h-3 w-3" /> View Recommendation
                      </Button>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CircleAlert className="h-4 w-4 mr-2 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">EPIC-103: Mobile redesign</p>
                      <p className="text-xs text-muted-foreground">Not linked to any OKR but consuming significant resources</p>
                      <Button size="sm" variant="outline" className="mt-1">
                        <ArrowRight className="mr-1 h-3 w-3" /> View Recommendation
                      </Button>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockAIRecommendations.map((rec) => (
              <Card key={rec.id} className="bg-slate-50 hover:shadow transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base flex items-center">
                      {rec.type === "Priority" && <ListChecks className="mr-2 h-5 w-5 text-blue-600" />}
                      {rec.type === "Release" && <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />}
                      {rec.type === "Misalignment" && <CircleAlert className="mr-2 h-5 w-5 text-amber-600" />}
                      {rec.type === "Feedback" && <Lightbulb className="mr-2 h-5 w-5 text-purple-600" />}
                      {rec.type} Recommendation
                    </CardTitle>
                    <Badge variant="outline" className="bg-purple-50">
                      {rec.confidence.toFixed(0)}% Confidence
                    </Badge>
                  </div>
                  <CardDescription>{new Date(rec.createdAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">{rec.content}</p>
                  <p className="text-xs text-muted-foreground font-light">{rec.reasoning}</p>
                  
                  {rec.relevantItems.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Related Items:</p>
                      <div className="flex flex-wrap gap-1">
                        {rec.relevantItems.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Apply Recommendation
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInsightsView;
