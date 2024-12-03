import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LOGIN_SCHEMA } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {

    const form = useForm<z.infer<typeof LOGIN_SCHEMA>>({
        resolver: zodResolver(LOGIN_SCHEMA),
    });

    function onSubmit(data: z.infer<typeof LOGIN_SCHEMA>) {
        console.log(data);
    }

    return (
        <div className="w-full h-full min-h-screen flex items-center justify-center">

            <Card className="w-96 h-fit">
                <CardHeader>
                    <CardTitle>Connexion</CardTitle>
                    <CardDescription>Connectez-vous au paneau d'administration</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-5">

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
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
                        <CardFooter>
                            <Button>Se connecter</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>

        </div>
    );
}