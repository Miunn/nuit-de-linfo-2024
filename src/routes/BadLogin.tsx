import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import HingeInput from "@/components/HingeInput";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";

// Using the same login schema as the original login component
const LOGIN_SCHEMA = z.object({
    username: z.string().min(1, "Nom d'utilisateur requis"),
    password: z.string().min(1, "Mot de passe requis")
});

const BadLogin: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof LOGIN_SCHEMA>>({
        resolver: zodResolver(LOGIN_SCHEMA),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const [fullNameZIndex, setFullNameZIndex] = useState(1);
    const [passwordZIndex, setPasswordZIndex] = useState(1);

    useEffect(() => {
        // Redirect if token is valid (same as original login component)
        const redirectIfTokenValid = (token: string | undefined, path: string) => {
            if (token) {
                fetch(`${import.meta.env.VITE_STATS_REMOTE_URL}/verify-token`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.valid) {
                        navigate(path);
                    }
                })
                .catch(() => {
                    // Token verification failed
                });
            }
        };

        redirectIfTokenValid(cookies.token, "/dashboard");
    }, [cookies.token, navigate]);

    const onSubmit = (data: z.infer<typeof LOGIN_SCHEMA>) => {
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
        }).catch(() => {
            setIsLoading(false);
            toast({
                title: "Erreur",
                description: "Erreur de connexion",
                variant: "destructive"
            });
        });
    };

    return (
        <div className="container relative">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <HingeInput 
                            placeholder="Nom d'utilisateur" 
                            value={field.value} 
                            onChangeText={field.onChange}
                            hingePosition="left" 
                            startRotation={-2} 
                            zIndex={fullNameZIndex} 
                            paddingHorizontal={15} 
                            onFocus={() => { 
                                setFullNameZIndex(2); 
                                setPasswordZIndex(1); 
                            }}
                            // error={errors.username?.message}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <HingeInput 
                            placeholder="Mot de passe" 
                            value={field.value} 
                            onChangeText={field.onChange}
                            hingePosition="right" 
                            startRotation={2} 
                            zIndex={passwordZIndex} 
                            paddingHorizontal={15} 
                            onFocus={() => { 
                                setPasswordZIndex(2); 
                                setFullNameZIndex(1); 
                            }}
                            type="password"
                            // error={errors.password?.message}
                        />
                    )}
                />

                <motion.div 
                    className="loginButton"
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connexion...
                            </>
                        ) : (
                            "Se connecter"
                        )}
                    </Button>
                </motion.div>
            </form>

            <Toaster />
        </div>
    );
};

export default BadLogin;