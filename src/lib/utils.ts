import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function checkIfTokenValid(token: string) {
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
}

export async function redirectIfTokenValid(token: string, requestedRoute: string, navigate: (to: string, options?: { replace: boolean }) => void) {
  const isTokenValid = await checkIfTokenValid(token);
  if (isTokenValid) {
    console.log("Redirect to requested route", requestedRoute);

    navigate(requestedRoute);
    return;
  }
  navigate("/login");
}