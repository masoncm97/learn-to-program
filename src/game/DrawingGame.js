// Remove the import since we're using global p5.js from CDN
// import p5 from 'p5';

export class DrawingGame {
  constructor() {
    this.shapes = [];
    this.animations = [];
    this.p5 = null;
    this.isInitialized = false;
  }

  // Initialize p5.js instance
  initialize(canvasRef, onConsoleOutput) {
    if (this.isInitialized) return;
    
    console.log('Initializing DrawingGame with p5.js');
    console.log('Canvas ref:', canvasRef.current);
    console.log('Global p5:', window.p5);
    console.log('Canvas ref parent:', canvasRef.current?.parentNode);
    
    if (!window.p5) {
      console.error('p5.js not available globally!');
      return;
    }
    
    if (!canvasRef.current) {
      console.error('Canvas ref not available!');
      return;
    }
    
    // Test p5.js functionality
    console.log('Testing p5.js functionality...');
    try {
      const testP5 = new window.p5((p) => {
        p.setup = () => {
          console.log('Test p5 setup called');
          const testCanvas = p.createCanvas(100, 100);
          p.background(0, 255, 0); // Green background
          console.log('Test canvas created:', testCanvas.elt);
          // Remove test canvas
          testCanvas.elt.remove();
        };
      });
      testP5.remove();
      console.log('p5.js test successful');
    } catch (error) {
      console.error('p5.js test failed:', error);
      return;
    }
    
    try {
      // Create a p5 instance using global p5
      this.p5 = new window.p5((p) => {
        console.log('p5 instance created');
        
        p.setup = () => {
          console.log('p5.js setup called');
          
          // Create a new canvas
          const canvas = p.createCanvas(800, 400);
          canvas.elt.id = 'p5-canvas';
          
          // Apply styling to make it visible
          canvas.elt.className = 'rounded-lg shadow-lg';
          canvas.elt.style.width = '100%';
          canvas.elt.style.maxWidth = '800px';
          canvas.elt.style.height = '400px';
          canvas.elt.style.backgroundColor = '#ffffff';
          canvas.elt.style.border = '2px solid #e5e7eb';
          canvas.elt.style.display = 'block';
          canvas.elt.style.visibility = 'visible';
          canvas.elt.style.position = 'absolute';
          canvas.elt.style.top = '50%';
          canvas.elt.style.left = '50%';
          canvas.elt.style.transform = 'translate(-50%, -50%)';
          canvas.elt.style.zIndex = '10';
          canvas.elt.removeAttribute('data-hidden');
          
          console.log('P5 canvas created:', canvas.elt);
          console.log('P5 canvas styles:', canvas.elt.style);
          
          // Hide the React canvas and position the p5 canvas in its place
          if (canvasRef.current) {
            console.log('Hiding React canvas and positioning p5 canvas');
            canvasRef.current.style.display = 'none';
            canvasRef.current.parentNode.style.position = 'relative';
            canvasRef.current.parentNode.appendChild(canvas.elt);
            console.log('P5 canvas added to DOM');
          }
          
          p.background(255); // White background
          p.noStroke();
          console.log('Canvas created:', canvas);
          console.log('Canvas element:', canvas.elt);
          console.log('Canvas in DOM:', document.getElementById('p5-canvas'));
          console.log('All canvases in DOM:', document.querySelectorAll('canvas'));
        };

        p.draw = () => {
          
          // Update and draw all shapes
          this.shapes.forEach((shape, index) => {
            if (shape.update) shape.update(p);
            if (shape.draw) shape.draw(p);
          });
          
          // Update and draw all animations
          this.animations.forEach((animation, index) => {
            if (animation.update) animation.update(p);
            if (animation.draw) animation.draw(p);
          });
          
          // Debug: draw a test shape if no shapes exist
          if (this.shapes.length === 0 && this.animations.length === 0) {
            p.fill(0, 255, 0);
            p.ellipse(400, 200, 50);
          }
        };
      });
      
      console.log('p5 instance:', this.p5);
    } catch (error) {
      console.error('Error creating p5 instance:', error);
    }

    this.isInitialized = true;
    console.log('DrawingGame initialized');
  }

  // Add a shape to the drawing
  addShape(shape) {
    if (shape && typeof shape === 'object') {
      this.shapes.push(shape);
      console.log('Shape added:', shape.constructor.name, 'Total shapes:', this.shapes.length);
    }
  }

  // Add an animation to the drawing
  addAnimation(animation) {
    if (animation && typeof animation === 'object') {
      this.animations.push(animation);
      console.log('Animation added:', animation.constructor.name, 'Total animations:', this.animations.length);
    }
  }

  // Clear all shapes and animations
  clear() {
    this.shapes = [];
    this.animations = [];
    
    // Also clear the p5 canvas background if p5 is available
    if (this.p5) {
      this.p5.background(255); // Clear to white background
    }
  }

  // Cleanup method
  cleanup() {
    if (this.p5) {
      // Remove the p5 canvas from DOM
      const p5Canvas = document.getElementById('p5-canvas');
      if (p5Canvas && p5Canvas.parentNode) {
        p5Canvas.parentNode.removeChild(p5Canvas);
      }
      
      // Restore React canvas visibility
      const reactCanvas = document.querySelector('canvas:not(#p5-canvas)');
      if (reactCanvas) {
        reactCanvas.style.display = 'block';
      }
      
      this.p5.remove();
      this.p5 = null;
    }
    this.isInitialized = false;
  }
}

// Helper classes for common shapes
export class Circle {
  constructor(x, y, radius, color = '#ff0000') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.rotationSpeed = 0;
  }

  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  setColor(color) {
    this.color = color;
  }

  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }

  update(p) {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;

    // Bounce off edges
    if (this.x - this.radius < 0 || this.x + this.radius > p.width) {
      this.vx *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > p.height) {
      this.vy *= -1;
    }

    // Wrap around edges
    if (this.x < -this.radius) this.x = p.width + this.radius;
    if (this.x > p.width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = p.height + this.radius;
    if (this.y > p.height + this.radius) this.y = -this.radius;
  }

  draw(p) {
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.rotation);
    p.fill(this.color);
    p.ellipse(0, 0, this.radius * 2);
    p.pop();
  }
}

export class Rectangle {
  constructor(x, y, width, height, color = '#00ff00') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.rotationSpeed = 0;
  }

  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  setColor(color) {
    this.color = color;
  }

  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }

  update(p) {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;

    // Bounce off edges
    if (this.x < 0 || this.x + this.width > p.width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y + this.height > p.height) {
      this.vy *= -1;
    }
  }

  draw(p) {
    p.push();
    p.translate(this.x + this.width / 2, this.y + this.height / 2);
    p.rotate(this.rotation);
    p.fill(this.color);
    p.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    p.pop();
  }
}

export class Triangle {
  constructor(x, y, size, color = '#0000ff') {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.rotationSpeed = 0;
  }

  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  setColor(color) {
    this.color = color;
  }

  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }

  update(p) {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;

    // Bounce off edges
    if (this.x < 0 || this.x > p.width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > p.height) {
      this.vy *= -1;
    }
  }

  draw(p) {
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.rotation);
    p.fill(this.color);
    p.triangle(0, -this.size, -this.size, this.size, this.size, this.size);
    p.pop();
  }
}

export class Particle {
  constructor(x, y, color = '#ff00ff') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.life = 255;
    this.decay = 2;
    this.size = Math.random() * 10 + 5;
  }

  update(p) {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;

    // Add some gravity
    this.vy += 0.1;
  }

  draw(p) {
    p.push();
    // Convert hex color to RGB and use alpha separately
    const hex = this.color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const alpha = Math.floor(this.life);
    p.fill(r, g, b, alpha);
    p.ellipse(this.x, this.y, this.size);
    p.pop();
  }

  isDead() {
    return this.life <= 0;
  }
} 