export class Snake {
  constructor(x = 200, y = 200) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.color = '#00ff00';
    this.direction = 'right';
    this.speed = 1;
    this.velocityX = this.speed;
    this.velocityY = 0;
  }

  setColor(color) {
    this.color = color;
  }

  setSpeed(speed) {
    this.speed = Math.max(0.1, Math.min(10, speed)); // Clamp between 0.1 and 10
    this.updateVelocity();
  }

  move(direction) {
    const directions = ['up', 'down', 'left', 'right'];
    if (directions.includes(direction)) {
      this.direction = direction;
      this.updateVelocity();
    }
  }

  updateVelocity() {
    switch (this.direction) {
      case 'up':
        this.velocityX = 0;
        this.velocityY = -this.speed;
        break;
      case 'down':
        this.velocityX = 0;
        this.velocityY = this.speed;
        break;
      case 'left':
        this.velocityX = -this.speed;
        this.velocityY = 0;
        break;
      case 'right':
        this.velocityX = this.speed;
        this.velocityY = 0;
        break;
    }
  }

  update(canvasWidth, canvasHeight) {
    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Wrap around canvas edges
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    
    // Add a border for better visibility
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
} 