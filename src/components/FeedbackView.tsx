
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MessageSquare, ThumbsUp, ThumbsDown, ArrowUpRight } from "lucide-react";
import { mockFeedback } from "@/data/mockData";
import { Feedback } from "@/types/feedback";

const FeedbackView = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter feedback based on active tab
  const filteredFeedback = activeTab === "all"
    ? mockFeedback
    : mockFeedback.filter(feedback => feedback.source.toLowerCase() === activeTab);
  
  // Helper function to get sentiment badge color
  const getSentimentColor = (sentiment: string): string => {
    switch(sentiment) {
      case "Positive": return "bg-green-100 text-green-800";
      case "Negative": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Feedback & Insights</h2>
        
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="nps">NPS</TabsTrigger>
          <TabsTrigger value="survey">Surveys</TabsTrigger>
          <TabsTrigger value="interview">Interviews</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeedback.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} getSentimentColor={getSentimentColor} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="nps" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeedback.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} getSentimentColor={getSentimentColor} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="survey" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeedback.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} getSentimentColor={getSentimentColor} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="interview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeedback.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} getSentimentColor={getSentimentColor} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="support" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeedback.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} getSentimentColor={getSentimentColor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">AI-Generated Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Feature Request Trend</CardTitle>
              <CardDescription>Based on 28 recent feedback items</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Our AI has detected a strong trend in user feedback requesting improved onboarding experiences, particularly for new team members. This aligns with OKR-Q3-02.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <ArrowUpRight className="mr-2 h-4 w-4" /> View Related OKR
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Potential Misalignment</CardTitle>
              <CardDescription>Warning: Detected mismatch between OKRs and Roadmap</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">We've detected that the "Improve user retention" OKR doesn't have enough associated roadmap items to achieve its targets by the deadline.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <ArrowUpRight className="mr-2 h-4 w-4" /> Review Gaps
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Feedback card component
interface FeedbackCardProps {
  feedback: Feedback;
  getSentimentColor: (sentiment: string) => string;
}

const FeedbackCard = ({ feedback, getSentimentColor }: FeedbackCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{feedback.content.substring(0, 40)}...</CardTitle>
            <CardDescription>{new Date(feedback.createdAt).toLocaleDateString()} • {feedback.createdBy}</CardDescription>
          </div>
          {feedback.sentiment && (
            <Badge className={`${getSentimentColor(feedback.sentiment)}`}>
              {feedback.sentiment === "Positive" ? <ThumbsUp className="h-3 w-3 mr-1" /> : 
               feedback.sentiment === "Negative" ? <ThumbsDown className="h-3 w-3 mr-1" /> : 
               <MessageSquare className="h-3 w-3 mr-1" />}
              {feedback.sentiment}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{feedback.content}</p>
        {feedback.linkedItemId && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              Linked to: {feedback.linkedItemType} {feedback.linkedItemId}
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-1">
          {feedback.tags.map((tag: string, idx: number) => (
            <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedbackView;
