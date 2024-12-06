// src/pages/Dashboard.tsx

import React, { useEffect, Suspense, lazy } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { redirectIfTokenValid } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { toast } from "@/hooks/use-toast";
import PredictAndSetInteractions from "@/components/Predict";
import NumberTicker from "@/components/ui/number-ticker";
// import { motion } from "framer-motion";

// Remove the direct import of ErrorsHeader
// import ErrorsHeader from "@/components/ErrorsHeader";

// Lazy load ErrorsHeader
const ErrorsHeader = lazy(() => import("@/components/ErrorsHeader"));

const Dashboard: React.FC = () => {
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();
    const [logins, setLogins] = React.useState(0);
    const [podcasts, setPodcasts] = React.useState(0);
    const [game, setGame] = React.useState(0);
    const [captcha, setCaptcha] = React.useState(0);

    const loadInteractions = async () => {
        const r = await fetch(`${import.meta.env.VITE_STATS_REMOTE_URL}/interactions`, {
            headers: {
                "Authorization": `Bearer ${cookies.token}`,
                "Content-Type": "application/json",
            }
        })

        if (!r.ok) {
            document.cookie = "";
            navigate("/login");
        }

        const data = await r.json();
        let log = 0;
        let pod = 0;
        let gam = 0;
        let cap = 0;

        data.forEach((interaction: any) => {
            switch (interaction.action) {
                case "login":
                    log++;
                    break;
                case "watch_podcast":
                    pod++;
                    break;
                case "game":
                    gam++;
                    break;
                case "captcha":
                    cap++;
                    break;
            }
        });

        setLogins(log);
        setPodcasts(pod);
        setGame(gam);
        setCaptcha(cap);
    }

    useEffect(() => {
        if (!cookies.token) {
            toast({
                title: "Non authentifié",
                description: "Veuillez vous connecter pour accéder au tableau de bord.",
                variant: "destructive",
            });
            navigate("/login");
        } else {
            redirectIfTokenValid(cookies.token, "/dashboard", navigate);
        }
    }, [cookies.token, navigate]);

    useEffect(() => {
        loadInteractions();
    }, []);

    return (

        <div className="min-h-screen flex flex-col overflow-hidden" style={{
        }}>
            <div className="flex-1 p-8 pt-6">
                <BentoGrid className="w-full mx-auto md:auto-rows-[20rem] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">

                    {/* BentoGridItem for Home Page */}
                    <BentoGridItem
                        title="Connexions"
                        description="Nombre d'utilisateur s'étant connectés"
                        header={
                            <div className="flex flex-1 justify-center items-center w-full h-full min-h-[6rem]">
                                {logins == 0 ?
                                    <p className="text-8xl">0</p>
                                    : <NumberTicker className="text-8xl" value={logins} />
                                }
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
                    />

                    {/* BentoGridItem for Predict Page */}
                    <BentoGridItem
                        title="Jeu"
                        description="Nombre d'utilisateurs ayant terminé le jeu"
                        header={
                            <div className="flex flex-1 items-center justify-center w-full h-full min-h-[6rem]">
                                {game == 0 ?
                                    <p className="text-8xl">0</p>
                                    : <NumberTicker className="text-8xl" value={game} />
                                }
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
                    />

                    {/* Existing BentoGridItems */}
                    <BentoGridItem
                        title="Podcast"
                        description="Nombre d'utilisateur ayant visionné un podcast"
                        header={
                            <div className="flex flex-1 justify-center items-center w-full h-full min-h-[6rem]">
                                {podcasts == 0 ?
                                    <p className="text-8xl">0</p>
                                    : <NumberTicker className="text-8xl" value={podcasts} />
                                }
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4"
                    />

                    <BentoGridItem
                        // title="Actions par minute"
                        description="Actions par minute"
                        header={
                            <Suspense fallback={<div>Chargement des erreurs...</div>}>
                                <ErrorsHeader />
                            </Suspense>
                        }
                        className="md:col-span-2 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4"
                    />

                    <BentoGridItem
                        title="Captcha"
                        description="Nombre d'utilisateurs ayant réussi le captcha"
                        header={
                            <div className="flex flex-1 justify-center items-center w-full h-full min-h-[6rem]">
                                {captcha == 0 ?
                                    <p className="text-8xl">0</p>
                                    : <NumberTicker className="text-8xl" value={captcha} />
                                }
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4"
                    />
                </BentoGrid>
            </div>
            <Toaster />
            <div className="self-center mb-64">
                <PredictAndSetInteractions />
            </div>
        </div>
    );
};

export default Dashboard;
