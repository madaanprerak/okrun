
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

interface NewReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewReleaseModal = ({ isOpen, onClose }: NewReleaseModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    releaseDate: "",
    capacity: 80,
    status: "Planned",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.description || !formData.releaseDate) {
      toast.error("Please fill all required fields");
      return;
    }

    // Here we would normally submit the data to an API
    console.log("Creating new release:", formData);
    
    // Show success message
    toast.success("New Release created", {
      description: `${formData.name} has been scheduled for ${formData.releaseDate}`,
    });
    
    // Close modal and reset form
    onClose();
    setFormData({
      name: "",
      description: "",
      releaseDate: "",
      capacity: 80,
      status: "Planned",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Release</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Release Name *</Label>
            <Input 
              id="name" 
              placeholder="E.g., July 2025 Release"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description" 
              placeholder="Describe the release"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="releaseDate">Release Date *</Label>
            <Input 
              id="releaseDate" 
              type="date"
              value={formData.releaseDate}
              onChange={(e) => handleChange("releaseDate", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="capacity">Capacity (Story Points)</Label>
              <Input 
                id="capacity" 
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", parseInt(e.target.value))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Released">Released</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Release</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewReleaseModal;
