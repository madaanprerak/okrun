import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockBacklogItems, mockRoadmapItems } from "@/data/mockData";
import { Search, Plus, Filter, Pencil, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPENAI_API_KEY = "sk-db51b24a75d24a3086b78edff45056d1";

const BacklogView = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  
  // Add statuses array
  const statuses = ["Ready", "Yet to Start", "In Progress"];
  
  // Function to calculate WSJF
  const calculateWSJF = (item) => {
    return (item.impactEstimate + item.costOfDelay + item.riskOpportunity) / item.effortEstimate;
  };

  const fetchWSJF = async (item) => {
    const prompt = `You are a helpful assistant. Calculate a WSJF score using this formula: 
(Impact + Cost of Delay + Risk) / Effort
Effort: ${item.effortEstimate}
Impact: ${item.impactEstimate}
Cost of Delay: ${item.costOfDelay}
Risk: ${item.riskOpportunity}
Return only raw JSON in the format:
{ "wsjf_score": number }
`;
    try {
      const res = await fetch("https://rnd.tnq.co.in/api/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
        }),
      });
      const data = await res.json();
      let content = data?.choices?.[0]?.message?.content?.trim() || "";
      if (content.startsWith("```")) {
        content = content.replace(/```json|```/g, "").trim();
      }
      const parsed = JSON.parse(content);
      return parsed.wsjf_score ?? calculateWSJF(item);
    } catch (err) {
      console.error("WSJF fetch failed:", err);
      return calculateWSJF(item);
    }
  };

  const fetchWSJFScores = async () => {
    const updatedItems = await Promise.all(
      mockBacklogItems.map(async (item) => {
        const wsjfScore = await fetchWSJF(item);
        return { ...item, wsjfScore };
      })
    );
    updatedItems.sort((a, b) => {
      // Sort logic to always put 'Ready' items last
      if (a.status === "Ready" && b.status !== "Ready") return 1;
      if (a.status !== "Ready" && b.status === "Ready") return -1;
      return b.wsjfScore - a.wsjfScore;
    });
    setItems(updatedItems);
  };

  const saveItem = async (item) => {
    const updatedItems = [...items];
    const index = updatedItems.findIndex((i) => i.id === item.id);
    const wsjfScore = await fetchWSJF(item);
    updatedItems[index] = { ...item, wsjfScore };
    updatedItems.sort((a, b) => {
      // Sort logic to always put 'Ready' items last
      if (a.status === "Ready" && b.status !== "Ready") return 1;
      if (a.status !== "Ready" && b.status === "Ready") return -1;
      return b.wsjfScore - a.wsjfScore;
    });
    setItems(updatedItems);
    setEditingItemId(null);
  };

  useEffect(() => {
    fetchWSJFScores();
  }, []);

  const getRoadmapItemTitle = (epicId) => {
    if (!epicId) return "No Epic";
    const epic = mockRoadmapItems.find((item) => item.id === epicId);
    return epic ? epic.title : "Unknown Epic";
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "Feature":
        return "bg-green-100 text-green-800";
      case "Bug":
        return "bg-red-100 text-red-800";
      case "Task":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Here we define filteredItems after determining items
  const filteredItems = items.filter((item) => {
    const matchesSearch = search
      ? item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleChange = (id, field, value) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item // Changed Number(value) to just value
    );
    setItems(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Backlog</h2>
        
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search backlog items..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Feature">Feature</SelectItem>
              <SelectItem value="Bug">Bug</SelectItem>
              <SelectItem value="Task">Task</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isEditing = editingItemId === item.id;
          return (
            <Card key={item.id}>
              <CardHeader className="pb-2 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getTypeBadgeColor(item.type)}>{item.type}</Badge>
                    <span className="text-xs text-muted-foreground">{item.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="whitespace-nowrap">
                    Status: {item.status}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      if (isEditing) saveItem(item);
                      else setEditingItemId(item.id);
                    }}
                  >
                    {isEditing ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block">Epic:</span>
                    <span className="font-medium">{getRoadmapItemTitle(item.linkedEpicId)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">WSJF Score:</span>
                    <span className="font-medium">{item.wsjfScore?.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-5 gap-2 w-full text-xs">
                  {["effortEstimate", "impactEstimate", "costOfDelay", "riskOpportunity"].map((key) => (
                    <div key={key}>
                      <span className="text-muted-foreground block">
                        {key === "costOfDelay"
                          ? "CoD"
                          : key === "riskOpportunity"
                          ? "Risk/Opp"
                          : key.replace("Estimate", "")}
                      </span>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={item[key]}
                          onChange={(e) => handleChange(item.id, key, e.target.value)}
                          className="text-xs"
                        />
                      ) : (
                        <span className="font-medium">{item[key]}</span>
                      )}
                    </div>
                  ))}
                  <div className="col-span-2">
                    <span className="text-muted-foreground block">Status:</span>
                    {isEditing ? (
                      <Select value={item.status} onValueChange={(value) => handleChange(item.id, "status", value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="font-medium">{item.status}</span>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BacklogView;