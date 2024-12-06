import { PhaserGame } from "@/components/Game/PhaserGame";
import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import { Toaster } from "@/components/ui/toaster";
import Spline from '@splinetool/react-spline';
import { useEffect, useState } from "react";

export default function Home() {
    const [gameStarted, setGameStarted] = useState(false);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const startGame = () => {
        setGameStarted(true);
    }

    const moveLogo = () => {
        setX(Math.random() * window.innerWidth);
        setY(Math.random() * window.innerHeight);
        console.log(x, y);
    }

    useEffect(() => {
        const intervalle = setInterval(() => {
            moveLogo();
        }, 1000);

        return () => clearInterval(intervalle);
    }, [moveLogo]);

    return (
        <div className="absolute top-0 left-0 w-full min-h-screen" style={{
            background: "linear-gradient(115deg, #62cff4, #2c67f2)"
        }}>
            {/* Meaty part - Meteor effect */}
            {gameStarted
                ? null
                : <Meteors number={24} />
            }


            <div className={`flex flex-col justify-center gap-10 z-30 transition-opacity ${gameStarted ? "opacity-0" : ""}`} style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                <h1 className="text-center font-semibold text-4xl leading-relaxed tracking-wider">Nos <i>océanes</i> sont malades.<br />Sauvons-les !</h1>

                <Button className="w-fit self-center p-6" onClick={startGame}>Sauvez Océane</Button>
            </div>


                : <div className={`absolute w-full h-full z-10 transition-opacity ${gameStarted ? "opacity-0" : ""}`} style={{
                    transform: "translateY(10%) translateX(30%)"
                }}>
                    <Spline className="animate-boat-bob" scene="https://prod.spline.design/GsOtxgXEI9a1QMY8/scene.splinecode" />
                </div>
            
            <div className={`absolute bottom-0 w-full ${gameStarted ? "h-0" : "h-96"} overflow-x-hidden`} style={{
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

            <div className={`transition-all duration-700 custom-shape-divider-bottom-1733453725 absolute ${gameStarted? "-top-[150px]" : "top-full"}`}>
                <svg className="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className={`transition-all duration-700 h-screen bg-[#0463CA] w-full absolute  z-20`} style={{
                top: gameStarted ? "0" : "calc(100% + 150px)"
            }}>

            </div>

            <div className={`h-screen w-full flex items-center z-50 justify-center`}>
            {gameStarted
                ? <div className="z-50">
                    <PhaserGame />
                </div>
                : null
            }
            </div>

            <Toaster />
        </div>
    );
}