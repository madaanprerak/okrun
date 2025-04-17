
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { mockObjectives, mockRoadmapItems, mockBacklogItems } from "@/data/mockData";

interface NewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewFeedbackModal = ({ isOpen, onClose }: NewFeedbackModalProps) => {
  const [formData, setFormData] = useState({
    content: "",
    source: "Interview",
    linkedItemType: "",
    linkedItemId: "",
    tags: "",
    sentiment: "Neutral",
    createdBy: "",
    feedbackUpload: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.content || !formData.source || !formData.createdBy) {
      toast.error("Please fill all required fields");
      return;
    }

    // Convert tags string to array
    const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);

    // Prepare feedback object
    const feedback = {
      ...formData,
      tags: tagsArray,
    };

    // Here we would normally submit the data to an API
    console.log("Creating new feedback:", feedback);
    
    // Show success message
    toast.success("New Feedback added", {
      description: `Feedback from ${formData.source} has been recorded`,
    });
    
    // Close modal and reset form
    onClose();
    setFormData({
      content: "",
      source: "Interview",
      linkedItemType: "",
      linkedItemId: "",
      tags: "",
      sentiment: "Neutral",
      createdBy: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Feedback</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="content">Feedback Content *</Label>
            <Textarea 
              id="content" 
              placeholder="Enter the feedback details"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="source">Source *</Label>
              <Select 
                value={formData.source}
                onValueChange={(value) => handleChange("source", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Survey">Survey</SelectItem>
                  <SelectItem value="NPS">NPS</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Support">Support Ticket</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sentiment">Sentiment</Label>
              <Select 
                value={formData.sentiment}
                onValueChange={(value) => handleChange("sentiment", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Positive">Positive</SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                  <SelectItem value="Negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="linkedItemType">Linked Item Type</Label>
              <Select 
                value={formData.linkedItemType}
                onValueChange={(value) => handleChange("linkedItemType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Objective">Objective</SelectItem>
                  <SelectItem value="RoadmapItem">Roadmap Item</SelectItem>
                  <SelectItem value="BacklogItem">Backlog Item</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="linkedItemId">Linked Item</Label>
              <Select 
                value={formData.linkedItemId}
                onValueChange={(value) => handleChange("linkedItemId", value)}
                disabled={!formData.linkedItemType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  {formData.linkedItemType === "Objective" && mockObjectives.map((obj) => (
                    <SelectItem key={obj.id} value={obj.id}>{obj.statement}</SelectItem>
                  ))}
                  
                  {formData.linkedItemType === "RoadmapItem" && mockRoadmapItems.map((item) => (
                    <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                  ))}
                  
                  {formData.linkedItemType === "BacklogItem" && mockBacklogItems.map((item) => (
                    <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Input 
              id="tags" 
              placeholder="Enter tags separated by commas"
              value={formData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">E.g., mobile, onboarding, pricing</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="createdBy">File to Upload</Label>
            <Input 
              type="file"
              id="feedbackFile" 
              // placeholder="E.g., Sarah Johnson"
              value={formData.feedbackUpload}
              onChange={(e) => handleChange("feedbackUpload", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="createdBy">Recorded By *</Label>
            <Input 
              id="createdBy" 
              placeholder="E.g., Sarah Johnson"
              value={formData.createdBy}
              onChange={(e) => handleChange("createdBy", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Feedback</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewFeedbackModal;
