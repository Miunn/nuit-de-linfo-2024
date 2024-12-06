import PodcastCard from "@/components/PodcastCard";

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
            <div className="grid" style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1rem",
                padding: "1rem"
            }}>
            {
                getPodcasts().map(podcast => {
                    return (
                        <PodcastCard title={podcast.title} description={podcast.description} imageUrl={podcast.imageUrl} />
                    )
                })
            }
            </div>
        </div>
    )
}