// src/pages/Dashboard.tsx

import React, { useEffect, Suspense, lazy } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { redirectIfTokenValid } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { toast } from "@/hooks/use-toast";
import PredictAndSetInteractions from "@/components/Predict";
// import { motion } from "framer-motion";

// Remove the direct import of ErrorsHeader
// import ErrorsHeader from "@/components/ErrorsHeader";

// Lazy load ErrorsHeader
const ErrorsHeader = lazy(() => import("@/components/ErrorsHeader"));

const Dashboard: React.FC = () => {
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

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
                            <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
                                {/* Optional: Add content here */}
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
                    />

                    {/* BentoGridItem for Predict Page */}
                    <BentoGridItem
                        title="Jeu"
                        description="Nombre d'utilisateurs ayant terminé le jeu"
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800">
                                {/* Optional: Add content here */}
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
                    />

                    {/* Existing BentoGridItems */}
                    <BentoGridItem
                        title="Podcast"
                        description="Nombre d'utilisateur ayant visionné un podcast"
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
                                {/* You can add content here if needed */}
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
                            <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                                {/* You can add content here if needed */}
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
