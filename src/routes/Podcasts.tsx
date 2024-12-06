import PodcastCard from "@/components/PodcastCard";
import { Fragment } from "react";

export function Podcasts() {

    const getPodcasts = () => {
        const podcasts = [
            {
                title: "Le code c'est cool",
                description: "Un podcast pour apprendre à coder",
                imageUrl: "/cover.png"
            },
            {
                title: "Le code c'est cool",
                description: "Un podcast pour apprendre à coder",
                imageUrl: "/cover.png"
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
                                <PodcastCard title={podcast.title} description={podcast.description} imageUrl={podcast.imageUrl} videoUrl={"/video.mp4"} />
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}