import { Button } from "@/components/ui/button";
import { color } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router";

export interface LayoutProps {
    showBorder?: boolean;
}

export function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const isIndexPage = location.pathname !== "/";

    const onClickDashboard = () => {
        navigate("/dashboard");
    }

    const onClickConnexion = () => {
        navigate("/login");
    }

    const onClickPodcasts = () => {
        navigate("/podcasts");
    }

    return (
        <div className="h-full min-h-screen" style={{
            background: "linear-gradient(115deg, #62cff4, #2c67f2)"
        }}>
            <header className={`fixed w-full ${isIndexPage ? "border-b" : ""} z-20 flex justify-stretch items-center`} style={{
            background: "linear-gradient(115deg, #62cff4, #2c67f2)"
        }}>
                <a href="/" className="w-fit pl-10">
                    <img src="/logo.png" alt="logo" className="h-10" />
                </a>

                <ul className=" w-full flex justify-end py-5 pr-10 bg-transparent">
                <li>
                        <Button variant="link" onClick={onClickDashboard}>Tableau de bord</Button>
                    </li>
                    <li>
                        <Button variant="link" onClick={onClickPodcasts}>Podcasts</Button>
                    </li>
                    <li>
                        <Button variant="link" onClick={onClickConnexion} style={{color: "white"}}>Connexion</Button>
                    </li>
                </ul>
            </header>
            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    )
}