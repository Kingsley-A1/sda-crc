import { cn } from "@/lib/utils";

import { Card } from "@/components/ui";

export interface StreamPlayerProps {
  streamUrl: string;
  className?: string;
}

export function StreamPlayer({ streamUrl, className }: StreamPlayerProps) {
  return (
    <Card className={cn("overflow-hidden", className)} padding="none">
      <div className="relative aspect-video w-full bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={streamUrl}
          title="Live stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </Card>
  );
}
