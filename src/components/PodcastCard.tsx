import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent } from "./ui/dialog";

export interface PodcastCardProps {
    title: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
}

export default function PodcastCard({ title, description, imageUrl, videoUrl }: PodcastCardProps) {
    return (
        <Card className="w-80 h-80 flex flex-col border-2 rounded-lg border-[#0463CA] ">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center">
                <img src={imageUrl} alt="podcast" />
            </CardContent>
            <CardFooter className="flex justify-end gap-5">
                <Button variant="outline">Écouter</Button>
                <Dialog>
                    <DialogTrigger asChild>
                <Button>Regarder</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                    <video src={videoUrl} controls className="w-full" />
                </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}