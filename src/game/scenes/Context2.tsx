import { Scene } from 'phaser';

export class Context2 extends Scene {

    constructor() {
        super({ key: 'Context2' });
    }

    create() {

        this.add.text(500, 300, 
            "Le foie humain et les récifs coralliens partagent une fonction essentielle de recyclage. Le foie filtre les toxines et recycle les nutriments pour maintenir l’équilibre interne du corps, tandis que les coraux servent de centres de recyclage dans les océans, transformant les déchets organiques et soutenant une biodiversité florissante. Tous deux sont vulnérables : le foie est affecté par les toxines et les mauvaises habitudes, et les coraux souffrent de blanchissement dû au réchauffement climatique et à la pollution. Protéger ces recycleurs est vital pour notre santé et celle des écosystèmes marins.",
            {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 800 }
            }
        ).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.start('Context3');
        });
    }
}