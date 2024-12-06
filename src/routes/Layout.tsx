import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "react-router";

export function Layout() {
    const navigate = useNavigate();

    const onClickConnexion = () => {
        navigate("/login");
    }

    const onClickPodcasts = () => {
        navigate("/podcasts");
    }

    return (
        <div>
            <header>
                <ul>
                    <li>
                        <Button variant="link" onClick={onClickPodcasts}>Podcasts</Button></li>
                    <li>
                        <Button variant="link" onClick={onClickConnexion}>Connexion</Button>
                    </li>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}