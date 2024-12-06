import PodcastCard from "@/components/PodcastCard";
import { Fragment } from "react";

export function Podcasts() {

    const getPodcasts = () => {
        const podcasts = [
            {
                title: "Le code c'est cool",
                description: "Un podcast pour apprendre à coder",
                imageUrl: "/podcasts/podcast-1.png",
                videoUrl: "/podcasts/vid-podcast-1.mp4"
            },
            {
                title: "Le code c'est cool",
                description: "Un podcast pour apprendre à coder",
                imageUrl: "/podcasts/podcast-2.png",
                videoUrl: "/podcasts/vid-podcast-2.mp4"
            }
        ]
        return podcasts;
    }

    return (
        <div>
            <div className="grid p-10" style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "1rem",
            }}>
                {
                    getPodcasts().map((podcast, index) => {
                        return (
                            <Fragment key={`${index}-${podcast.title}`}>
                                <PodcastCard title={podcast.title} description={podcast.description} imageUrl={podcast.imageUrl} videoUrl={podcast.videoUrl} />
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}