import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export interface PodcastCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

export default function PodcastCard({ title, description, imageUrl }: PodcastCardProps) {
    return (
        <Card className="w-72 h-80 flex flex-col">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center">
                <img src={imageUrl} alt="podcast" />
            </CardContent>
            <CardFooter className="flex justify-end gap-5">
                <Button variant="outline">Écouter</Button>
                <Button>Regarder</Button>
            </CardFooter>
        </Card>
    )
}