
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { mockObjectives } from "@/data/mockData";
import { Objective, KeyResult } from "@/types";

const OKRList = () => {
  const [filter, setFilter] = useState<"all" | "Now" | "Next" | "Later">("all");
  
  const filteredObjectives = filter === "all" 
    ? mockObjectives 
    : mockObjectives.filter(objective => objective.phase === filter);
    
  const calculateKrProgress = (kr: KeyResult) => {
    return Math.min(100, Math.max(0, (kr.currentValue / kr.targetValue) * 100));
  };

  const calculateObjectiveProgress = (objective: Objective) => {
    if (!objective.keyResults.length) return 0;
    
    const total = objective.keyResults.reduce(
      (sum, kr) => sum + calculateKrProgress(kr), 
      0
    );
    
    return total / objective.keyResults.length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Objectives & Key Results</h2>
       
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setFilter(v as any)}>
        <TabsList>
          <TabsTrigger value="all">All OKRs</TabsTrigger>
          <TabsTrigger value="Now">Now</TabsTrigger>
          <TabsTrigger value="Next">Next</TabsTrigger>
          <TabsTrigger value="Later">Later</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            {filteredObjectives.map((objective) => (
              <Card key={objective.id} className="border-l-4" style={{ borderLeftColor: objective.phase === "Now" ? "#3b82f6" : objective.phase === "Next" ? "#8b5cf6" : "#94a3b8" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{objective.statement}</CardTitle>
                      <CardDescription className="mt-1">
                        {objective.id} • {objective.quarter} • Owner: {objective.owner}
                      </CardDescription>
                    </div>
                    <Badge variant={objective.phase === "Now" ? "default" : "secondary"}>
                      {objective.phase}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Progress</div>
                      <div className="font-medium">
                        {Math.round(calculateObjectiveProgress(objective))}%
                      </div>
                    </div>
                    <Progress value={calculateObjectiveProgress(objective)} className="mt-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="text-sm font-semibold mb-3">Key Results</h4>
                  <div className="space-y-4">
                    {objective.keyResults.map((kr) => (
                      <div key={kr.id} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div>{kr.statement}</div>
                          <div className="font-medium">
                            {kr.currentValue} / {kr.targetValue} {kr.unit}
                          </div>
                        </div>
                        <Progress value={calculateKrProgress(kr)} />
                      </div>
                    ))}
                  </div>
                  
                  {objective.linkedRoadmapItems && objective.linkedRoadmapItems.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Linked Roadmap Items</h4>
                      <div className="flex flex-wrap gap-2">
                        {objective.linkedRoadmapItems.map(itemId => (
                          <Badge key={itemId} variant="outline">{itemId}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="Now" className="mt-6">
          <div className="space-y-6">
            {/* content will be rendered by the filter */}
          </div>
        </TabsContent>
        
        <TabsContent value="Next" className="mt-6">
          <div className="space-y-6">
            {/* content will be rendered by the filter */}
          </div>
        </TabsContent>
        
        <TabsContent value="Later" className="mt-6">
          <div className="space-y-6">
            {/* content will be rendered by the filter */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OKRList;
