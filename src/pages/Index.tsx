
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import Dashboard from "@/components/Dashboard";
import OKRList from "@/components/OKRList";
import RoadmapView from "@/components/RoadmapView";
import BacklogView from "@/components/BacklogView";
import ReleasesView from "@/components/ReleasesView";
import FeedbackView from "@/components/FeedbackView";
import RetroView from "@/components/RetroView";
import AIInsightsView from "@/components/AIInsightsView";
import NewObjectiveModal from "@/components/modals/NewObjectiveModal";
import NewRoadmapItemModal from "@/components/modals/NewRoadmapItemModal";
import NewBacklogItemModal from "@/components/modals/NewBacklogItemModal";
import NewReleaseModal from "@/components/modals/NewReleaseModal";
import NewFeedbackModal from "@/components/modals/NewFeedbackModal";
import Logo from '../assets/logo/logo.svg';
import { styled } from '@mui/system';

const LogoStyled = styled('img')({
  width: 40,
  height: 40
});

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [objectiveModalOpen, setObjectiveModalOpen] = useState(false);
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const [backlogModalOpen, setBacklogModalOpen] = useState(false);
  const [releaseModalOpen, setReleaseModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const handleCreateNew = () => {
    // Determine what to create based on active tab and open the appropriate modal
    switch (activeTab) {
      case "okrs":
        setObjectiveModalOpen(true);
        break;
      case "roadmap":
        setRoadmapModalOpen(true);
        break;
      case "backlog":
        setBacklogModalOpen(true);
        break;
      case "releases":
        setReleaseModalOpen(true);
        break;
      case "feedback":
        setFeedbackModalOpen(true);
        break;
      default:
        toast.info("Create New", {
          description: "Select a specific tab to create an item"
        });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{display: "flex", alignItems: "center"}}>
              <LogoStyled
                    src={Logo}
                    alt="Logo"
                    sx={{marginRight: '5px'}}
                />
                OKRUN
              </h1>
            <p className="text-muted-foreground">
              AI-Powered Product Execution Platform
            </p>
          </div>
          <div>
            <Button onClick={handleCreateNew}>Create New</Button>
          </div>
        </div>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-6"
      >
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="okrs">OKRs</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="backlog">Backlog</TabsTrigger>
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="retros">Retros</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <Dashboard />
        </TabsContent>
        <TabsContent value="okrs" className="space-y-4">
          <OKRList />
        </TabsContent>
        <TabsContent value="roadmap" className="space-y-4">
          <RoadmapView />
        </TabsContent>
        <TabsContent value="backlog" className="space-y-4">
          <BacklogView />
        </TabsContent>
        <TabsContent value="releases" className="space-y-4">
          <ReleasesView />
        </TabsContent>
        <TabsContent value="feedback" className="space-y-4">
          <FeedbackView />
        </TabsContent>
        <TabsContent value="retros" className="space-y-4">
          <RetroView />
        </TabsContent>
        <TabsContent value="ai" className="space-y-4">
          <AIInsightsView />
        </TabsContent>
      </Tabs>
      
      {/* Modals */}
      <NewObjectiveModal 
        isOpen={objectiveModalOpen} 
        onClose={() => setObjectiveModalOpen(false)} 
      />
      <NewRoadmapItemModal 
        isOpen={roadmapModalOpen} 
        onClose={() => setRoadmapModalOpen(false)} 
      />
      <NewBacklogItemModal 
        isOpen={backlogModalOpen} 
        onClose={() => setBacklogModalOpen(false)} 
      />
      <NewReleaseModal 
        isOpen={releaseModalOpen} 
        onClose={() => setReleaseModalOpen(false)} 
      />
      <NewFeedbackModal 
        isOpen={feedbackModalOpen} 
        onClose={() => setFeedbackModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
