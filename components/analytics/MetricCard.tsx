import { Card, CardContent } from "@/components/ui/card";

interface Props {
  label: string;
  value: number;
  change?: number;
}

export default function MetricCard({ label, value, change }: Props) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm text-gray-500 mb-1">{label}</div>
        <div className="text-3xl font-bold text-gray-900">
          {value.toLocaleString()}
        </div>
        {change !== undefined && (
          <div
            className={`text-xs mt-1 font-medium ${
              change >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}% vs last period
          </div>
        )}
      </CardContent>
    </Card>
  );
}
