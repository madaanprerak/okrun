
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

interface NewObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewObjectiveModal = ({ isOpen, onClose }: NewObjectiveModalProps) => {
  const [formData, setFormData] = useState({
    statement: "",
    quarter: "Q3 2025",
    owner: "",
    phase: "Now",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.statement || !formData.owner) {
      toast.error("Please fill all required fields");
      return;
    }

    // Here we would normally submit the data to an API
    console.log("Creating new objective:", formData);
    
    // Show success message
    toast.success("New Objective created", {
      description: `${formData.statement} has been added for ${formData.quarter}`,
    });
    
    // Close modal and reset form
    onClose();
    setFormData({
      statement: "",
      quarter: "Q3 2025",
      owner: "",
      phase: "Now",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Objective</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="statement">Objective Statement *</Label>
            <Textarea 
              id="statement" 
              placeholder="E.g., Improve user retention"
              value={formData.statement}
              onChange={(e) => handleChange("statement", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quarter">Quarter</Label>
              <Select 
                value={formData.quarter}
                onValueChange={(value) => handleChange("quarter", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                  <SelectItem value="Q2 2025">Q2 2025</SelectItem>
                  <SelectItem value="Q3 2025">Q3 2025</SelectItem>
                  <SelectItem value="Q4 2025">Q4 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phase">Phase</Label>
              <Select 
                value={formData.phase}
                onValueChange={(value) => handleChange("phase", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Now">Now</SelectItem>
                  <SelectItem value="Next">Next</SelectItem>
                  <SelectItem value="Later">Later</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="owner">Owner *</Label>
            <Input 
              id="owner" 
              placeholder="E.g., Sarah Johnson"
              value={formData.owner}
              onChange={(e) => handleChange("owner", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Objective</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewObjectiveModal;
