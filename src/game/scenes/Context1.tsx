import { Scene } from 'phaser';

export class Context1 extends Scene {

    constructor() {
        super({ key: 'Context1' });
    }

    create() {

        this.add.text(500, 300, 
            "Les poumons humains et le phytoplancton des océans sont essentiels à la vie : les premiers échangent les gaz vitaux pour notre corps, tandis que le second produit la moitié de l'oxygène que nous respirons et absorbe le CO₂. Cet équilibre est menacé par la pollution, le réchauffement climatique et d'autres pressions. Protéger nos poumons et nos 'poumons bleus' implique de réduire les polluants, préserver les écosystèmes et adopter des pratiques durables pour garantir la santé de notre planète et de ses habitants.",
            {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 800 }
            }
        ).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.start('Context2');
        });
    }
}