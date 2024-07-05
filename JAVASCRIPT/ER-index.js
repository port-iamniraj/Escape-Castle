const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
const player = new Player({
    imageSrc: "./IMAGES/assets/img/king/idle.png",
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./IMAGES/assets/img/king/idle.png",
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./IMAGES/assets/img/king/idleLeft.png",
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./IMAGES/assets/img/king/runRight.png",
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./IMAGES/assets/img/king/runLeft.png",
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: "./IMAGES/assets/img/king/enterDoor.png",
            onComplete: () => {
                console.log("complete");
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++;
                        if (level === 4) {
                            level = 1;
                        }
                        levels[level].init();
                        // player.switchSprite("idleRight");
                        player.preventInput = false;
                        gsap.to(overlay, {
                            opacity: 0
                        });
                    }
                });
            }
        }
    }
});

let level = 1;
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectFrom2D();
            player.collisionBlocks = collisionBlocks;

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false;
            }

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./IMAGES/assets/img/backgroundLevel1.png"
            });

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270
                    },
                    imageSrc: "./IMAGES/assets/img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoPlay: false
                }),
            ];
        }
    },

    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 35;
            player.position.y = 70;

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false;
            }

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./IMAGES/assets/img/backgroundLevel2.png"
            });

            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336
                    },
                    imageSrc: "./IMAGES/assets/img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoPlay: false
                }),
            ];
        }
    },

    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 735;
            player.position.y = 140;

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false;
            }

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./IMAGES/assets/img/backgroundLevel3.png"
            });

            doors = [
                new Sprite({
                    position: {
                        x: 209,
                        y: 335
                    },
                    imageSrc: "./IMAGES/assets/img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoPlay: false
                }),
            ];
        }
    }
};

const keys = {
    " ": {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
};

const overlay = {
    opacity: 0
};

function animate() {
    window.requestAnimationFrame(animate);

    background.draw();
    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.draw();
    // });
    doors.forEach(door => {
        door.draw();
    });

    player.handleInput(keys);
    player.draw();
    player.update();

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = "#000";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
}

levels[level].init();
animate();