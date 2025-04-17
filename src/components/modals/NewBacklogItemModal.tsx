
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/sonner";
import { mockRoadmapItems } from "@/data/mockData";

interface NewBacklogItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewBacklogItemModal = ({ isOpen, onClose }: NewBacklogItemModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Feature",
    linkedEpic: "",
    effortEstimate: 5,
    impactEstimate: 5,
    costOfDelay: 5,
    riskOpportunity: 5,
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.title || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    // Here we would normally submit the data to an API
    console.log("Creating new backlog item:", formData);
    
    // Show success message
    toast.success("New Backlog Item created", {
      description: `${formData.title} has been added as ${formData.type}`,
    });
    
    // Close modal and reset form
    onClose();
    setFormData({
      title: "",
      description: "",
      type: "Feature",
      linkedEpic: "",
      effortEstimate: 5,
      impactEstimate: 5,
      costOfDelay: 5,
      riskOpportunity: 5,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Backlog Item</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              placeholder="E.g., Design new welcome screen"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description" 
              placeholder="Describe the backlog item"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="linkedEpic">Linked Epic</Label>
              <Select 
                value={formData.linkedEpic}
                onValueChange={(value) => handleChange("linkedEpic", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select epic" />
                </SelectTrigger>
                <SelectContent>
                  {mockRoadmapItems.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Effort Estimate (Story Points): {formData.effortEstimate}</Label>
            <Slider 
              value={[formData.effortEstimate]} 
              min={1} 
              max={13} 
              step={1} 
              onValueChange={(value) => handleChange("effortEstimate", value[0])} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Impact Estimate (1-10): {formData.impactEstimate}</Label>
            <Slider 
              value={[formData.impactEstimate]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(value) => handleChange("impactEstimate", value[0])} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Cost of Delay (1-10): {formData.costOfDelay}</Label>
            <Slider 
              value={[formData.costOfDelay]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(value) => handleChange("costOfDelay", value[0])} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Risk/Opportunity (1-10): {formData.riskOpportunity}</Label>
            <Slider 
              value={[formData.riskOpportunity]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(value) => handleChange("riskOpportunity", value[0])} 
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Backlog Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewBacklogItemModal;
