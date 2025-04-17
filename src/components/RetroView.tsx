
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, AlertTriangle, Lightbulb, FileText, Plus, Sparkles } from "lucide-react";
import { mockRetrospectives } from "@/data/mockData";

const RetroView = () => {
  const [selectedRetro, setSelectedRetro] = useState(mockRetrospectives[0]?.id || "");
  
  // Find selected retrospective
  const activeRetro = mockRetrospectives.find(retro => retro.id === selectedRetro) || mockRetrospectives[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Retrospectives</h2>
        
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-2">Release Retrospectives</h3>
            {mockRetrospectives.map(retro => (
              <Card 
                key={retro.id} 
                className={`cursor-pointer hover:shadow transition-shadow ${retro.id === selectedRetro ? 'border-2 border-primary' : ''}`}
                onClick={() => setSelectedRetro(retro.id)}
              >
                <CardHeader className="p-3">
                  <CardTitle className="text-base">{retro.releaseId}</CardTitle>
                  <CardDescription className="text-xs">
                    {new Date(retro.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-3">
          {activeRetro && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{activeRetro.releaseId} Retrospective</h2>
                  <p className="text-sm text-muted-foreground">Created on {new Date(activeRetro.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge variant="outline" className="ml-2">
                  <Sparkles className="mr-1 h-3 w-3" /> AI Generated
                </Badge>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <CheckCheck className="mr-2 h-5 w-5 text-green-600" /> Planned vs Delivered
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Planned ({activeRetro.plannedVsDelivered.planned.length})</h4>
                    <ul className="space-y-1">
                      {activeRetro.plannedVsDelivered.planned.map((item, idx) => (
                        <li key={idx} className="text-xs bg-slate-100 p-1 rounded">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Delivered ({activeRetro.plannedVsDelivered.delivered.length})</h4>
                    <ul className="space-y-1">
                      {activeRetro.plannedVsDelivered.delivered.map((item, idx) => (
                        <li key={idx} className="text-xs bg-green-100 p-1 rounded">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Dropped ({activeRetro.plannedVsDelivered.dropped.length})</h4>
                    <ul className="space-y-1">
                      {activeRetro.plannedVsDelivered.dropped.map((item, idx) => (
                        <li key={idx} className="text-xs bg-red-100 p-1 rounded">{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" /> Delays & Blockers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {activeRetro.delays.map((delay, idx) => (
                        <li key={idx} className="text-sm">{delay}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5 text-blue-600" /> Key Learnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {activeRetro.learnings.map((learning, idx) => (
                        <li key={idx} className="text-sm">{learning}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-purple-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-purple-600" /> AI Suggested Improvements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activeRetro.aiSuggestedImprovements.map((suggestion, idx) => (
                      <li key={idx} className="text-sm">{suggestion}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Export to PDF
                </Button>
                <Button>
                  Share Retrospective
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetroView;
