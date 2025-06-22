export class BouncingBall {
  constructor(x = 200, y = 100, radius = 15) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = '#ff0000';
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0;
    this.bounciness = 0.8;
    this.friction = 0.99; // Slight velocity reduction on bounce
  }

  setColor(color) {
    this.color = color;
  }

  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  setBounce(bounciness) {
    this.bounciness = Math.max(0, Math.min(1, bounciness)); // Clamp between 0-1
  }

  setGravity(gravity) {
    this.gravity = gravity;
  }

  update(canvasWidth, canvasHeight) {
    // Apply gravity
    this.vy += this.gravity;
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    
    // Bounce off edges
    if (this.x - this.radius <= 0) {
      this.x = this.radius;
      this.vx = -this.vx * this.bounciness * this.friction;
    } else if (this.x + this.radius >= canvasWidth) {
      this.x = canvasWidth - this.radius;
      this.vx = -this.vx * this.bounciness * this.friction;
    }
    
    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.vy = -this.vy * this.bounciness * this.friction;
    } else if (this.y + this.radius >= canvasHeight) {
      this.y = canvasHeight - this.radius;
      this.vy = -this.vy * this.bounciness * this.friction;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Add a border for better visibility
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
} 