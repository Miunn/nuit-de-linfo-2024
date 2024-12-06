import { Scene } from 'phaser';

export class Context4 extends Scene {

    constructor() {
        super({ key: 'Context4' });
    }

    create() {

        this.add.text(500, 300, 
            "SAUVEZ OCÉANE !\n\nVous avez appris comment les organes humains et les écosystèmes marins sont liés. Maintenant, vous devez aider Océane à retrouver l'équilibre en réparant ses organes endommagés. Chaque organe correspond à un écosystème marin menacé. En travaillant ensemble, vous pouvez sauver Océane et protéger la santé de la planète !",
            {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 800 }
            }
        ).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.start('BeachLeft');
        });
    }
}