import { cn } from "@/lib/utils";

export interface PodcastViewerProps {
    podcastUrl: string;
    className?: string;
}

export default function PodcastViewer({podcastUrl, className}: PodcastViewerProps) {
    return (
        <div className={cn(className, "flex flex-col items-center gap-5")}>
            <iframe src={podcastUrl} className="w-full h-96" />
        </div>
    )
}