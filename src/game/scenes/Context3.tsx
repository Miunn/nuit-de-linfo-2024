import { Scene } from 'phaser';

export class Context3 extends Scene {

    constructor() {
        super({ key: 'Context3' });
    }

    create() {

        this.add.text(500, 300, 
            "Le cœur humain et les courants marins jouent un rôle crucial de transport. Le cœur pompe le sang, distribuant oxygène et nutriments à tout le corps, tandis que les courants marins déplacent les nutriments, l’oxygène et la chaleur, soutenant la vie marine et régulant le climat. Tous deux sont essentiels à l’équilibre de leur système respectif mais fragiles face aux perturbations : maladies pour le cœur, dérèglements climatiques et pollution pour les océans. Protéger ces 'pompes de vie' est indispensable pour la santé humaine et planétaire.",
            {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 800 }
            }
        ).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.start('Context4');
        });
    }
}