import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
    username: z.string({
        required_error: "Le nom d'utilisateur est requis",
    }).min(1, {
        message: "Le nom d'utilisateur est requis",
    }),
    password: z.string({
        required_error: "Le mot de passe est requis",
    }).min(1, {
        message: "Le mot de passe est requis",
    }),
});
