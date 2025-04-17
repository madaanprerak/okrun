
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { mockObjectives } from "@/data/mockData";

interface NewRoadmapItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewRoadmapItemModal = ({ isOpen, onClose }: NewRoadmapItemModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Now",
    linkedOkr: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.title || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    // Here we would normally submit the data to an API
    console.log("Creating new roadmap item:", formData);
    
    // Show success message
    toast.success("New Roadmap Item created", {
      description: `${formData.title} has been added with ${formData.priority} priority`,
    });
    
    // Close modal and reset form
    onClose();
    setFormData({
      title: "",
      description: "",
      priority: "Now",
      linkedOkr: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Roadmap Item</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              placeholder="E.g., Onboarding Redesign"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description" 
              placeholder="Describe the roadmap item"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Now">Now</SelectItem>
                  <SelectItem value="Next">Next</SelectItem>
                  <SelectItem value="Later">Later</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="linkedOkr">Linked OKR</Label>
              <Select 
                value={formData.linkedOkr}
                onValueChange={(value) => handleChange("linkedOkr", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select OKR" />
                </SelectTrigger>
                <SelectContent>
                  {mockObjectives.map((objective) => (
                    <SelectItem key={objective.id} value={objective.id}>
                      {objective.statement}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate" 
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input 
                id="endDate" 
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Roadmap Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoadmapItemModal;
