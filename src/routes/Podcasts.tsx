import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function Podcasts() {
    const navigate = useNavigate();

    const onClickConnexion = () => {
        navigate("/login");
    }

    const onClickPodcasts = () => {
        navigate("/podcasts");
    }

    return (
        <div>
            <div className="space-x-6 absolute right-20 top-3">
                <Button variant="link" onClick={onClickPodcasts}>Podcasts</Button>
                <Button variant="link" onClick={onClickConnexion}>Connexion</Button>
            </div>
        </div>
    )
}