import { Card, CardContent } from "@/components/ui/card";
import { FileText, Send, Clock, AlertCircle } from "lucide-react";

interface Props {
  stats: { total: number; published: number; scheduled: number; draft: number };
}

const items = [
  { key: "total", label: "Total Posts", icon: FileText, color: "text-blue-600" },
  { key: "published", label: "Published", icon: Send, color: "text-green-600" },
  { key: "scheduled", label: "Scheduled", icon: Clock, color: "text-yellow-600" },
  { key: "draft", label: "Drafts", icon: AlertCircle, color: "text-gray-500" },
] as const;

export default function QuickStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(({ key, label, icon: Icon, color }) => (
        <Card key={key}>
          <CardContent className="p-4 flex items-center gap-3">
            <Icon className={`h-5 w-5 ${color}`} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats[key]}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
