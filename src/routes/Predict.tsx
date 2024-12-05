import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { redirectIfTokenValid } from "@/lib/utils";
import { z } from "zod";

const PREDICT_SCHEMA = z.object({
    username: z.string().min(1, "Le nom d'utilisateur est requis"),
});

type PredictFormValues = z.infer<typeof PREDICT_SCHEMA>;

interface PredictionResult {
    username: string;
    last_action: string;
    predicted_next_action: string;
    probability: number;
}

export default function Predict() {
    const [isLoading, setIsLoading] = useState(false);
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);

    const form = useForm<PredictFormValues>({
        resolver: zodResolver(PREDICT_SCHEMA),
        defaultValues: {
            username: "",
        },
    });

    useEffect(() => {
        redirectIfTokenValid(cookies.token, "/predict", navigate);
    }, [cookies.token, navigate]);

    const handleSubmit = async (data: PredictFormValues) => {
        if (!cookies.token) {
            toast({
                title: "Non autorisé",
                description: "Vous devez être connecté",
                variant: "destructive",
            });
            navigate("/login");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_STATS_REMOTE_URL}/predict_next_action/${data.username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
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
                description: (error as Error).message || "Échec de la récupération de la prédiction",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full min-h-screen flex items-center justify-center">
            <Card className="w-96 h-fit">
                <CardHeader>
                    <CardTitle>Prédire la prochaine action</CardTitle>
                    <CardDescription>Entrez le nom d'utilisateur pour obtenir une prédiction</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <CardContent className="space-y-5">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom d'utilisateur</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            {isLoading ? (
                                <Button type="submit" disabled className="w-full">
                                    <Loader2 className="animate-spin mr-2" /> Prédire
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full">Prédire</Button>
                            )}
                        </CardFooter>
                    </form>
                </Form>
                {prediction && (
                    <CardContent className="space-y-2">
                        <p><strong>Dernière Action :</strong> {prediction.last_action}</p>
                        <p><strong>Prochaine Action Prédite :</strong> {prediction.predicted_next_action}</p>
                        <p><strong>Probabilité :</strong> {(prediction.probability * 100).toFixed(2)}%</p>
                    </CardContent>
                )}
            </Card>
            <Toaster />
        </div>
    );
}
