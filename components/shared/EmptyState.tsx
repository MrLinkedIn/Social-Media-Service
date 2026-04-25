import { InboxIcon } from "lucide-react";

interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <InboxIcon className="h-10 w-10 text-gray-300 mb-3" />
      <h3 className="text-base font-medium text-gray-700">{title}</h3>
      {description && <p className="text-sm text-gray-400 mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
