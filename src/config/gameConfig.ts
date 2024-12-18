export const GAME_CONFIG = {
    CHARACTER_SPEED: 200,
    WALK_PATH_Y: 500,
    SCENE_HEIGHT: 600,
    SCENE_WIDTH: 1000,
    INITIAL_X: 100,
    ITEMS: [
      { id: 1, icon: "liver", location: "beach_left", x: 260, y: 380, message: "Vous plongez pour sauver l'écosystème", scene: "LiverGame"},
      { id: 2, icon: "lung", location: "beach_left", x: 740, y: 380, message: "Vous Plongez pour réanimer des poumons", scene: "LungGame" },
      { id: 3, icon: "heart", location: "beach_right", x: 500, y: 380, message: "Battez le boss finale pour sauver le coeur de la mer !", scene: "HeartGame" }
    ]
  };