
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockReleases, mockBacklogItems } from "@/data/mockData";
import { Calendar, Package, AlertTriangle, Users, Plus } from "lucide-react";

const ReleasesView = () => {
  // Helper to get backlog item details
  const getBacklogItemDetails = (itemId: string) => {
    return mockBacklogItems.find(item => item.id === itemId);
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string): string => {
    switch(status) {
      case "Planned": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Released": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Release Planning</h2>
        
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {mockReleases.map(release => (
          <Card key={release.id} className="relative">
            <div className="absolute top-0 right-0 h-2 w-1/3 rounded-tr-md" 
                 style={{ 
                   backgroundColor: release.status === "Released" ? "#22c55e" : 
                                   release.status === "In Progress" ? "#eab308" : "#3b82f6" 
                 }} />
                 
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{release.name}</CardTitle>
                  <CardDescription>{release.description}</CardDescription>
                </div>
                <Badge className={getStatusBadgeColor(release.status)}>
                  {release.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center space-x-4 text-sm mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{new Date(release.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{release.includedItems.length} items</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Included Items</h4>
                <div className="space-y-2">
                  {release.includedItems.map(itemId => {
                    const item = getBacklogItemDetails(itemId);
                    if (!item) return null;
                    
                    return (
                      <div key={itemId} className="text-sm p-2 bg-slate-50 rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{itemId}</div>
                        </div>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                    );
                  })}
                </div>
                
                {release.risksBlockers.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center space-x-1 text-sm font-medium text-amber-600 mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <h4>Risks & Blockers</h4>
                    </div>
                    <ul className="text-sm list-disc list-inside space-y-1 text-amber-700">
                      {release.risksBlockers.map((risk, idx) => (
                        <li key={idx}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <div className="w-full">
                <div className="flex items-center space-x-1 text-sm font-medium mb-1">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" /> 
                  <h4>Stakeholders</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {release.stakeholders.map((stakeholder, idx) => (
                    <Badge key={idx} variant="secondary">{stakeholder}</Badge>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReleasesView;
