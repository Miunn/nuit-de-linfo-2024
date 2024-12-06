import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";

// Schema for Predict Form
const PREDICT_SCHEMA = z.object({
    username: z.string().min(1, "Le nom d'utilisateur est requis"),
});

// Type for Predict Form Values
type PredictFormValues = z.infer<typeof PREDICT_SCHEMA>;

// Schema for Set Interactions Form
const SET_INTERACTIONS_SCHEMA = z.object({
    username: z.string().min(1, "Le nom d'utilisateur est requis"),
    interactions: z.string().min(1, "Les interactions sont requises"),
});

// Type for Set Interactions Form Values
type SetInteractionsFormValues = z.infer<typeof SET_INTERACTIONS_SCHEMA>;

// Interface for Prediction Result
interface PredictionResult {
    username: string;
    last_action: string;
    predicted_next_action: string;
    probability: number;
}

// Utility function to check token validity
const isTokenValid = async (token: string) => {
    try {
        const r = await fetch(import.meta.env.VITE_STATS_REMOTE_URL + "/check-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "access_token": token,
                "token_type": "Bearer"
            })
        });

        return r.ok;
    } catch {
        return false;
    }
};

export default function PredictAndSetInteractions() {
    const [isLoadingPredict, setIsLoadingPredict] = useState(false);
    const [isLoadingSet, setIsLoadingSet] = useState(false);
    const [cookies, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);

    // Form for Prediction
    const predictForm = useForm<PredictFormValues>({
        resolver: zodResolver(PREDICT_SCHEMA),
        defaultValues: {
            username: "",
        },
    });

    // Form for Setting Interactions
    const setInteractionsForm = useForm<SetInteractionsFormValues>({
        resolver: zodResolver(SET_INTERACTIONS_SCHEMA),
        defaultValues: {
            username: "",
            interactions: "",
        },
    });

    // Check token validity on component mount and when token changes
    useEffect(() => {
        const checkTokenAndRedirect = async () => {
            // If no token, redirect to login
            if (!cookies.token) {
                navigate("/login");
                return;
            }

            // Verify token validity
            const valid = await isTokenValid(cookies.token);
            if (!valid) {
                // Remove invalid token
                removeCookie('token', { path: '/' });

                // Show toast and redirect to login
                toast({
                    title: "Session expirée",
                    description: "Votre session a expiré. Veuillez vous reconnecter.",
                    variant: "destructive",
                });
                navigate("/login");
            }
        };

        checkTokenAndRedirect();
    }, [cookies.token, navigate, removeCookie]);

    // Handle Predict Form Submission
    const handlePredictSubmit = async (data: PredictFormValues) => {
        // Ensure token exists before making request
        if (!cookies.token) {
            toast({
                title: "Non autorisé",
                description: "Vous devez être connecté",
                variant: "destructive",
            });
            navigate("/login");
            return;
        }

        setIsLoadingPredict(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_STATS_REMOTE_URL}/predict_next_action/${data.username}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    // Token is no longer valid
                    removeCookie('token', { path: '/' });
                    toast({
                        title: "Non autorisé",
                        description: "Votre session a expiré. Veuillez vous reconnecter.",
                        variant: "destructive",
                    });
                    navigate("/login");
                    return;
                }
                throw new Error("Échec de la récupération de la prédiction");
            }

            const result: PredictionResult = await response.json();
            setPrediction(result);
        } catch (error) {
            toast({
                title: "Erreur",
                description:
                    (error as Error).message ||
                    "Échec de la récupération de la prédiction",
                variant: "destructive",
            });
        } finally {
            setIsLoadingPredict(false);
        }
    };

    const handleSetInteractionsSubmit = async (data: SetInteractionsFormValues) => {
        if (!cookies.token) {
            toast({
                title: "Non autorisé",
                description: "Vous devez être connecté",
                variant: "destructive",
            });
            navigate("/login");
            return;
        }

        setIsLoadingSet(true);
        try {
            data.interactions = data.interactions.replace(/\s/g, "");
            const response = await fetch(
                `${import.meta.env.VITE_STATS_REMOTE_URL}/set/user-interactions/list`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookies.token}`,
                    },
                    body: JSON.stringify({
                        username: data.username,
                        interactions: data.interactions,
                    }),
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    // Token is no longer valid
                    removeCookie('token', { path: '/' });
                    toast({
                        title: "Non autorisé",
                        description: "Votre session a expiré. Veuillez vous reconnecter.",
                        variant: "destructive",
                    });
                    navigate("/login");
                    return;
                }
                if (response.status === 403) {
                    toast({
                        title: "Accès interdit",
                        description: "Vous n'avez pas les permissions nécessaires.",
                        variant: "destructive",
                    });
                    return;
                }
                const errorData = await response.json();
                throw new Error(errorData.message || "Échec de la mise à jour des interactions");
            }

            const result = await response.json();
            toast({
                title: "Succès",
                description: result.message || "Interactions enregistrées avec succès",
                variant: "default",
            });
            setInteractionsForm.reset();
        } catch (error) {
            toast({
                title: "Erreur",
                description:
                    (error as Error).message ||
                    "Échec de la mise à jour des interactions",
                variant: "destructive",
            });
        } finally {
            setIsLoadingSet(false);
        }
    };


    return (
        <div className="p-4 overflow-y-hidden">
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
                {/* Prediction Card */}
                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle>Prédire la prochaine action</CardTitle>
                        <CardDescription>
                            Entrez le nom d'utilisateur pour obtenir une prédiction
                        </CardDescription>
                    </CardHeader>
                    <Form {...predictForm}>
                        <form onSubmit={predictForm.handleSubmit(handlePredictSubmit)} className="flex-1 flex flex-col">
                            <CardContent className="flex-1 space-y-5">
                                <FormField
                                    control={predictForm.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom d'utilisateur</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            {prediction && (
                                <CardContent className="space-y-2">
                                    <p>
                                        <strong>Dernière Action :</strong> {prediction.last_action}
                                    </p>
                                    <p>
                                        <strong>Prochaine Action Prédite :</strong>{" "}
                                        {prediction.predicted_next_action}
                                    </p>
                                    <p>
                                        <strong>Probabilité :</strong>{" "}
                                        {(prediction.probability * 100).toFixed(2)}%
                                    </p>
                                </CardContent>
                            )}
                            <CardFooter>
                                {isLoadingPredict ? (
                                    <Button type="submit" disabled className="w-full">
                                        <Loader2 className="animate-spin mr-2" /> Prédire
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full">
                                        Prédire
                                    </Button>
                                )}
                            </CardFooter>
                        </form>
                    </Form>
                </Card>

                {/* Set Interactions Card */}
                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle>Définir les interactions utilisateur</CardTitle>
                        <CardDescription>
                            Entrez le nom d'utilisateur et les interactions à enregistrer
                        </CardDescription>
                    </CardHeader>
                    <Form {...setInteractionsForm}>
                        <form onSubmit={setInteractionsForm.handleSubmit(handleSetInteractionsSubmit)} className="flex-1 flex flex-col">
                            <CardContent className="flex-1 space-y-5">
                                <FormField
                                    control={setInteractionsForm.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom d'utilisateur</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={setInteractionsForm.control}
                                    name="interactions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Interactions</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="action1,action2,action3"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                {isLoadingSet ? (
                                    <Button type="submit" disabled className="w-full">
                                        <Loader2 className="animate-spin mr-2" /> Enregistrer
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full">
                                        Enregistrer
                                    </Button>
                                )}
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
            <Toaster />
        </div>
    );
}