# Code Games - Learn Programming Visually

An interactive web application that teaches programming concepts through visual feedback. Write JavaScript code to control a snake game in real-time!

## Features

- **Monaco Code Editor**: Full-featured code editor with syntax highlighting and autocomplete
- **Real-time Code Execution**: See your code changes reflected immediately in the game
- **Visual Game Canvas**: 400x400px canvas with grid lines for precise positioning
- **Console Output**: View logs, errors, and warnings from your code
- **Snake Game Engine**: Simple but powerful game engine with a Snake class
- **Dark Theme**: Modern, professional dark theme throughout the application

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd learn-to-program
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Use

### Snake Class Methods

The application provides a `Snake` class with the following methods:

- `new Snake(x, y)` - Creates a new snake at the specified position
- `setColor(color)` - Changes the snake's color (e.g., 'red', '#00ff00')
- `move(direction)` - Moves the snake in the specified direction ('up', 'down', 'left', 'right')
- `setSpeed(speed)` - Sets the snake's movement speed (0.1 to 10)

### Example Code

```javascript
// Create a green snake at the center
const snake = new Snake(200, 200);
snake.setColor('green');
snake.move('right');
snake.setSpeed(3);

// Log some information
console.log('Snake created successfully!');
```

### Features

- **Auto-execution**: Code runs automatically 500ms after you stop typing
- **Error Handling**: Syntax errors and runtime errors are displayed in the console
- **Multiple Snakes**: Create as many snakes as you want
- **Edge Wrapping**: Snakes wrap around the canvas edges
- **Grid System**: 20x20 pixel grid for precise positioning

## Project Structure

```
src/
├── components/
│   ├── CodeEditor.jsx      # Monaco editor component
│   ├── GameCanvas.jsx      # HTML5 canvas component
│   └── Console.jsx         # Console output component
├── game/
│   ├── Snake.js           # Snake class implementation
│   └── gameEngine.js      # Game engine and rendering loop
├── App.jsx                # Main application component
├── main.jsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## Technologies Used

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code's web editor
- **HTML5 Canvas** - Game rendering

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization

You can easily extend the game by:

1. Adding new methods to the `Snake` class
2. Creating new game objects in the `game/` directory
3. Modifying the game engine to support new features
4. Adding new code examples and tutorials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.
