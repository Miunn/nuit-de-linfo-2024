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
            <header className="fixed w-full">
                <ul className=" w-full flex justify-end pt-5 pr-10 bg-transparent">
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