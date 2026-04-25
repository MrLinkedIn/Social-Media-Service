import { Badge } from "@/components/ui/badge";
import { Store } from "lucide-react";

interface Props {
  type: string;
}

export default function BusinessTypeBadge({ type }: Props) {
  return (
    <Badge variant="secondary" className="gap-1 font-normal">
      <Store className="h-3 w-3" />
      {type}
    </Badge>
  );
}
