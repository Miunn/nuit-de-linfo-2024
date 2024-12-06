import { useRef } from "react";
import { CaptchaComponent, IGame } from "../components/captcha/captcha"

export default function Captcha() {

  const gameRef = useRef<IGame | null>(null);

  return (
    <div style={{ height: "70vh" }}>
      <CaptchaComponent currentActiveScene={null} ref={gameRef} />
    </div>
  );
}
