import PodcastCard, { PodcastCardProps } from "@/components/PodcastCard";
import PodcastViewer, { PodcastViewerProps } from "@/components/PodcastViewer";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useId, useRef, useState } from "react";
import { useOnClickOutside } from 'usehooks-ts';

export function Podcasts() {
    const [active, setActive] = useState<PodcastCardProps | boolean | null>(
        null
    );
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

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

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
          if (event.key === "Escape") {
            setActive(false);
          }
        }
     
        if (active && typeof active === "object") {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
     
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
      }, [active]);
     
      useOnClickOutside(ref, () => setActive(null));

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
                                <PodcastCard title={podcast.title} description={podcast.description} imageUrl={podcast.imageUrl} />
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}