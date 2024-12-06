export const GAME_CONFIG = {
    CHARACTER_SPEED: 200,
    WALK_PATH_Y: 500,
    SCENE_HEIGHT: 600,
    SCENE_WIDTH: 1000,
    INITIAL_X: 100,
    ITEMS: [
      { id: 1, location: "beach_left", x: 260, y: 380, message: "Vous plongez pour sauver l'écosystème", scene: "LiverGame"},
      { id: 2, location: "beach_left", x: 740, y: 380, message: "Vous Plongez pour réanimer des poumons", scene: "HeartGame" },
      { id: 3, location: "beach_right", x: 260, y: 380, message: "CCCCCCCC", scene: "ImmuneGame" },
      { id: 3, location: "beach_right", x: 740, y: 380, message: "Battez le boss finale pour sauver le coeur de la mer !", scene: "HeartGame" }
    ],
    INVENTORY: [
      { id: 1, name: "Foie", description: "Un objet mystérieux", obtained: false },
      { id: 2, name: "Poummons", description: "Un autre objet mystérieux", obtained: false },
      { id: 3, name: "Système Immunitaire", description: "Encore un objet mystérieux", obtained: false },
      { id: 4, name: "Coeur", description: "Encore encore un objet mystérieux", obtained: false }
    ]
  };