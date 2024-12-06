// src/pages/Dashboard.tsx

import React, { useEffect, Suspense, lazy } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router"; 
import { Toaster } from "@/components/ui/toaster";
import { redirectIfTokenValid } from "@/lib/utils"; 
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { toast } from "@/hooks/use-toast";
// import { motion } from "framer-motion";
import {
    IconClipboardCopy,
} from "@tabler/icons-react";
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
        <div className="h-screen bg-background flex flex-col overflow-hidden">
            <div className="flex-1 p-8 pt-6">
                <BentoGrid className="w-full mx-auto md:auto-rows-[20rem] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
                    
                    {/* BentoGridItem for Home Page */}
                    <BentoGridItem
                        title="Accueil"
                        description="Retournez à la page d'accueil."
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
                                {/* Optional: Add content here */}
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />

                    {/* BentoGridItem for Predict Page */}
                    <BentoGridItem
                        title="Prédiction"
                        description="Accédez à la page de prédiction."
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800">
                                {/* Optional: Add content here */}
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />

                    {/* Existing BentoGridItems */}
                    <BentoGridItem
                        title="Gestion des utilisateurs"
                        description="Gérez les utilisateurs de votre plateforme."
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
                                {/* You can add content here if needed */}
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4"
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
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
                        // icon={<IconFileBroken className="h-4 w-4 text-neutral-500" />}
                    />

                    <BentoGridItem
                        title="Statistiques"
                        description="Visualisez les statistiques."
                        header={
                            <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                                {/* You can add content here if needed */}
                            </div>
                        }
                        className="md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4"
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />
                </BentoGrid>
            </div>
            <Toaster />
        </div>
    );
};

export default Dashboard;
