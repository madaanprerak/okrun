
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockRoadmapItems, mockObjectives } from "@/data/mockData";
import { Plus } from "lucide-react";

const RoadmapView = () => {
  const [filter, setFilter] = useState<"all" | "Now" | "Next" | "Later">("all");
  
  const filteredItems = filter === "all" 
    ? mockRoadmapItems 
    : mockRoadmapItems.filter(item => item.priority === filter);
    
  // Helper to get objective title from ID
  const getObjectiveTitle = (okrId: string) => {
    const objective = mockObjectives.find(obj => obj.id === okrId);
    return objective ? objective.statement : "Unknown Objective";
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Not Started": return "bg-slate-200 text-slate-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Blocked": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Roadmap</h2>
        
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setFilter(v as any)}>
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="Now">Now</TabsTrigger>
          <TabsTrigger value="Next">Next</TabsTrigger>
          <TabsTrigger value="Later">Later</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-center py-2 bg-slate-100 rounded-md">Now</h3>
              {filteredItems
                .filter(item => item.priority === "Now")
                .map(item => (
                  <RoadmapCard key={item.id} item={item} getObjectiveTitle={getObjectiveTitle} getStatusColor={getStatusColor} />
                ))}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-center py-2 bg-slate-100 rounded-md">Next</h3>
              {filteredItems
                .filter(item => item.priority === "Next")
                .map(item => (
                  <RoadmapCard key={item.id} item={item} getObjectiveTitle={getObjectiveTitle} getStatusColor={getStatusColor} />
                ))}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-center py-2 bg-slate-100 rounded-md">Later</h3>
              {filteredItems
                .filter(item => item.priority === "Later")
                .map(item => (
                  <RoadmapCard key={item.id} item={item} getObjectiveTitle={getObjectiveTitle} getStatusColor={getStatusColor} />
                ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="Now" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Content will be filtered automatically */}
          </div>
        </TabsContent>
        
        <TabsContent value="Next" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Content will be filtered automatically */}
          </div>
        </TabsContent>
        
        <TabsContent value="Later" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Content will be filtered automatically */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const RoadmapCard = ({ item, getObjectiveTitle, getStatusColor }: any) => {
  return (
    <Card className="cursor-pointer hover:shadow transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">
            {item.title}
          </CardTitle>
          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
        
        <div className="text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Timeline:</span>
            <span>{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</span>
          </div>
          
          {item.linkedOkrIds && item.linkedOkrIds.length > 0 && (
            <div>
              <span className="text-muted-foreground">OKRs:</span>
              <div className="mt-1 space-y-1">
                {item.linkedOkrIds.map((okrId: string) => (
                  <div key={okrId} className="text-xs bg-purple-50 text-purple-800 px-2 py-1 rounded">
                    {getObjectiveTitle(okrId)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapView;
