import { Button } from "@/components/ui/button";
import { Outlet, useLocation, useNavigate } from "react-router";

export interface LayoutProps {
    showBorder?: boolean;
}

export function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const showBorder = location.pathname !== "/";

    const onClickConnexion = () => {
        navigate("/login");
    }

    const onClickPodcasts = () => {
        navigate("/podcasts");
    }

    return (
        <div>
            <header className={`fixed w-full ${showBorder ? "border-b" : ""} z-10`}>
                <ul className=" w-full flex justify-end py-5 pr-10 bg-transparent">
                    <li>
                        <Button variant="link" onClick={onClickPodcasts}>Podcasts</Button></li>
                    <li>
                        <Button variant="link" onClick={onClickConnexion}>Connexion</Button>
                    </li>
                </ul>
            </header>
            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    )
}