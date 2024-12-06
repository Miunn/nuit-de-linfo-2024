import { Scene, GameObjects, Input } from 'phaser';

export class HeartGame extends Scene {
    private player!: GameObjects.Sprite;
    private boss!: GameObjects.Sprite;
    private bossHealth: number = 100;
    private healthBar!: GameObjects.Rectangle;
    private bullets!: GameObjects.Group;
    private background!: GameObjects.TileSprite;
    private itemsCollected: number = 0;
    private moveDirection: number = 0; // 0=none, -1=up, 1=down

    constructor() {
        super({ key: 'HeartGame' });
    }

    preload() {
        this.load.image('sea_background', 'assets/sea_background.png');
        this.load.image('boss_shark', 'assets/boss_shark.png');
        this.load.spritesheet('character', 
            'https://labs.phaser.io/assets/sprites/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 
            this.game.config.width as number, 
            this.game.config.height as number, 
            'sea_background'
        );
        this.background.setOrigin(0, 0);

        this.player = this.add.sprite(100, 300, 'character');
        this.player.setScale(2);
        
        this.boss = this.add.sprite(800, 300, 'boss_shark');
        this.boss.setScale(1);

        this.healthBar = this.add.rectangle(700, 50, 200, 20, 0x00ff00);

        this.bullets = this.add.group({
            classType: GameObjects.Rectangle,
            runChildUpdate: true
        });

        this.input.on('pointerdown', (pointer: Input.Pointer) => {
            const screenMidpoint = (this.game.config.height as number) / 2;

            if (this.boss.getBounds().contains(pointer.x, pointer.y)) {
                this.shootBullet();
            }
            else if (pointer.y < screenMidpoint) {
                this.moveDirection = -1;  // up
            } 
            else {
                this.moveDirection = 1;   // down
            }
        });

        this.input.on('pointerup', () => {
            this.moveDirection = 0;
        });

        this.anims.create({
            key: 'surf',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.player.play('surf');
    }

    update() {
        this.background.tilePositionX += 2;
    
        if (this.moveDirection === -1 && this.player.y > 50) {
            this.player.y -= 4;
        }
        if (this.moveDirection === 1 && this.player.y < 550) {
            this.player.y += 4;
        }
    
        this.boss.y = 300 + Math.sin(this.time.now / 1000) * 100;
    
        this.bullets.children.each((bullet) => {
            if (bullet.active && Phaser.Geom.Intersects.RectangleToRectangle(
                (bullet as GameObjects.Rectangle).getBounds(),
                this.boss.getBounds()
            )) {
                bullet.destroy();
                
                this.bossHealth -= 5;
                
                this.healthBar.width = (this.bossHealth / 100) * 200;
                
                if (this.bossHealth <= 0) {
                    this.scene.start('GameEnd');
                }
            }
            return true;
        });
    }

    private shootBullet() {
        const bullet = this.add.rectangle(
            this.player.x + 40,
            this.player.y,
            20,
            5,
            0xff0000
        ) as GameObjects.Rectangle;
        
        this.bullets.add(bullet);
        this.physics.world.enable(bullet);
        (bullet.body as Phaser.Physics.Arcade.Body).velocity.x = 400;

        bullet.update = function() {
            if (bullet.x > 800) bullet.destroy();
        }
    }
}