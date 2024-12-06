import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { LOGIN_SCHEMA } from "@/lib/forms";
import { redirectIfTokenValid } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { CaptchaComponent } from '@/components/captcha/captcha';
import { EventBus } from '@/components/captcha/phaser/eventbus';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const captchaRef = useRef(null);

    const form = useForm<z.infer<typeof LOGIN_SCHEMA>>({
        resolver: zodResolver(LOGIN_SCHEMA),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    useEffect(() => {
        // Listen for captcha validation result
        const handleValidation = (valid: boolean) => {
            setIsCaptchaValid(valid);
        };

        EventBus.on("valid", handleValidation);

        return () => {
            EventBus.off("valid", handleValidation);
        };
    }, []);

    function onSubmit(data: z.infer<typeof LOGIN_SCHEMA>) {
        // Only proceed if captcha is valid
        if (!isCaptchaValid) {
            toast({
                title: "Erreur",
                description: "Veuillez compléter le captcha",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        fetch(`${import.meta.env.VITE_STATS_REMOTE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            setIsLoading(false);
            return res.json();
        }).then(data => {
            if (!data.access_token) {
                toast({
                    title: "Erreur",
                    description: "Nom d'utilisateur ou mot de passe incorrect",
                    variant: "destructive"
                });
                return;
            }

            Promise.resolve(
                setCookie('token', data.access_token, { path: "/" })
            ).then(() => {
                navigate("/");
            });
        });
    }

    useEffect(() => {
        redirectIfTokenValid(cookies.token, "/dashboard", navigate);
    }, [cookies.token]);

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center justify-center space-y-4">
            <Card className="w-96 h-fit">
                <CardHeader>
                    <CardTitle>Connexion</CardTitle>
                    <CardDescription>Connectez-vous au panneau d'administration</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-5">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom d'utilisateur</FormLabel>
                                        <FormControl>
                                            <Input placeholder="admin" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex-col space-y-4">
                            <CaptchaComponent 
                                ref={captchaRef} 
                                currentActiveScene={null} 
                            />
                            {isLoading
                            ? <Button disabled><Loader2 className="animate-spin mr-2" /> Se connecter</Button>
                            : <Button type="submit" disabled={!isCaptchaValid}>Se connecter</Button>}
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            <Toaster />
        </div>
    );
}