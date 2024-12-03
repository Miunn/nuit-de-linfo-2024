import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
    username: z.string({
        required_error: "Le nom d'utilisateur est requis",
    }),
    password: z.string({
        required_error: "Le mot de passe est requis",
    }),
});
