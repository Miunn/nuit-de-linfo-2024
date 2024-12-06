import { PhaserGame } from "@/components/Game/PhaserGame";
import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import { Toaster } from "@/components/ui/toaster";
import Spline from '@splinetool/react-spline';
import { useState } from "react";

export default function Home() {
    const [gameStarted, setGameStarted] = useState(false);



    const startGame = () => {
        setGameStarted(true);
    }

    return (
        <div className="absolute top-0 left-0 w-full min-h-screen" style={{
            background: "linear-gradient(115deg, #62cff4, #2c67f2)"
        }}>
            {/* Meaty part - Meteor effect */}
            <Meteors number={24} />

            {gameStarted ?
                null
                : <>
                    <div className="flex flex-col justify-center gap-10 z-30" style={{
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>
                        <h1 className="text-center font-semibold text-4xl leading-relaxed tracking-wider">Nos <i>océanes</i> sont malades.<br />Sauvons-les !</h1>

                        <Button className="w-fit self-center p-6" onClick={startGame}>Sauvez Océane</Button>
                    </div>
                </>}

            <div className="absolute w-full h-full z-10" style={{
                transform: "translateY(10%) translateX(30%)"
            }}>
                <Spline className="animate-boat-bob" scene="https://prod.spline.design/GsOtxgXEI9a1QMY8/scene.splinecode" />
            </div>
            <div className="absolute bottom-0 w-full h-96 overflow-x-hidden" style={{
                filter: "hue-rotate(0deg) brightness(1) contrast(1)",
                perspective: "34vh"
            }}>
                {/* Horizon blur overlay */}
                <div className="absolute w-full h-full z-10 mix-blend-overlay" style={{
                    backgroundImage: "linear-gradient(rgb(194, 243, 255), rgb(38, 138, 254) 10%, rgb(142, 241, 255))",
                    transform: "scale(10) skewX(45deg) rotateX(85deg) translateY(20%)",
                    transformOrigin: "center top 0px",
                }} />
                {/* Water */}
                <div className="w-full h-full bg-[url('water.png')] bg-repeat animate-water-translate" style={{
                    transform: "translateX(-50%) scale(10) skewX(45deg) rotateX(85deg) translateY(20%)",
                    transformOrigin: "center top 0px",

                }} />
            </div>
            {/*<RetroGrid angle={50} />*/}

            {gameStarted
                ? <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                    <PhaserGame />
                </div>
                : null
            }

            <Toaster />
        </div>
    );
}