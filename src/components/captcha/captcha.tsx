import { useRef, useLayoutEffect, forwardRef } from 'react'
import GameCore from './phaser/gamecore'
import { EventBus } from './phaser/eventbus';
import MainScene from './phaser/scenes/mainscene';

const ip = "http://10.8.11.200:7999"

export interface IArg {
  currentActiveScene: Phaser.Scene | null
}

export interface IGame {
  game: GameCore | null
}

export const CaptchaComponent = forwardRef<IGame, IArg>(function GameComponent({ currentActiveScene }, ref) {

  const game = useRef<GameCore | null>(null);

  useLayoutEffect(() => {
    console.log("LAYOUT EFFECT : " + game.current)
    if (game.current === null) {
      console.log("BUILDING SCENE...")
      game.current = new GameCore("game-container");
      fetch(ip + "/initialize").then(async (data: Response) => {
        const cid: string = (await data.json())["client_id"]
        console.log(cid)
        fetch(ip + "/generate-token", {
          body: JSON.stringify({
            "client_id": cid
          },), method: "POST", headers: { "Content-Type": "application/json" }
        }).then(async (data: Response) => {
          const token: string = (await data.json())["recaptcha_token"]
          EventBus.on("result", (data: MainScene) => {
            const data_str = JSON.stringify({ "mouse_data": { "mouse_movements": data.positons }, "recaptcha_token": token })
            fetch(ip + "/analyze-mouse", { body: data_str, method: "POST", headers: { "Content-Type": "application/json" } }).then(async (resp: Response) => {
              const valid = (await resp.json())["is_human"]
              EventBus.emit("valid", valid)
            })
          })
          EventBus.emit("rdy")
        })
      })




      if (ref) {
        if (typeof ref === 'function') {
          ref({ game: game.current });
        } else {
          ref.current = { game: game.current };
        }
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        game.current = null;
      }
    }
  }, [ref]);

  useLayoutEffect(() => {

  }, [currentActiveScene, ref]);

  return (
    <div id="game-container">
    </div>
  );
});

