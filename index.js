import kaboom from "kaboom";

kaboom();

// Load the character sprite
loadSprite("char", "sprites/spritesheet.png", {
  sliceX: 2, // Our spritesheet is 2 wide
  sliceY: 1, // Our spritesheet is 1 tall
  anims: {
    idle: { from: 0, to: 0 },
    run: { from: 0, to: 1, loop: true, speed: 15 },
    jump: { from: 1, to: 0, speed: 2 },
  },
});

// Add Character
const char = add([
  sprite("char", {
    frame: 0,
  }),
  pos(120, 80),
  scale(3),
  area(),
  body(),
]);

char.running = false; //

// Add a platform
add([
  rect(width(), 48),
  pos(0, height() - 48),
  outline(4),
  area(),
  solid(),
  color(127, 200, 255),
]);

// Add a box
add([
  rect(100, 30),
  pos(width() / 2, 80),
  outline(4),
  area(),
  solid(),
  body(),
  color(255, 0, 0),
]);

// Handle controls

// Jumping
onKeyPress("space", () => {
  if (char.isGrounded()) {
    char.running = false;
    char.jump();
    char.play("jump");
  }
});

// Running
onKeyDown("d", () => {
  if (!char.running && char.isGrounded()) {
    char.running = true;
    char.play("run");
  }
  char.flipX(true);
  char.move(200, 0);
});

onKeyPress("d", () => {
  if (!char.running && char.isGrounded()) {
    char.running = true;
    char.play("run");
  }
});

onKeyRelease("d", () => {
  char.running = false;
  char.play("idle");
});

onKeyDown("a", () => {
  if (!char.running && char.isGrounded()) {
    char.running = true;
    char.play("run");
  }
  char.flipX(false);
  char.move(-200, 0);
});

onKeyPress("a", () => {
  if (!char.running && char.isGrounded()) {
    char.running = true;
    char.play("run");
  }
});

onKeyRelease("a", () => {
  char.running = false;
  char.play("idle");
});
