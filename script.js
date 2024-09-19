const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size for mobile screens
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Variables
let hearts = [];
let score = 0;
let basket = {
  x: canvas.width / 2 - 30,
  y: canvas.height - 30,
  width: 60,
  height: 20,
  speed: 20
};

// Play background music when the page loads
const music = document.getElementById('backgroundMusic');
music.play();

// Heart Object
function createHeart() {
  return {
    x: Math.random() * (canvas.width - 30),
    y: -20,
    width: 20,
    height: 20,
    speed: 2 + Math.random() * 3
  };
}

// Draw basket
function drawBasket() {
  ctx.fillStyle = '#ff4081';
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

// Draw heart
function drawHeart(heart) {
  ctx.beginPath();
  ctx.moveTo(heart.x + heart.width / 2, heart.y + heart.height / 3);
  ctx.arc(heart.x + heart.width / 4, heart.y, heart.width / 4, 0, Math.PI, true);
  ctx.arc(heart.x + (3 * heart.width) / 4, heart.y, heart.width / 4, 0, Math.PI, true);
  ctx.lineTo(heart.x + heart.width / 2, heart.y + heart.height);
  ctx.fillStyle = '#ff4081';
  ctx.fill();
}

// Move basket with buttons
document.getElementById('leftBtn').addEventListener('touchstart', () => {
  if (basket.x > 0) {
    basket.x -= basket.speed;
  }
});

document.getElementById('rightBtn').addEventListener('touchstart', () => {
  if (basket.x + basket.width < canvas.width) {
    basket.x += basket.speed;
  }
});

// Move basket with arrow keys (for desktop)
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && basket.x > 0) {
    basket.x -= basket.speed;
  } else if (event.key === 'ArrowRight' && basket.x + basket.width < canvas.width) {
    basket.x += basket.speed;
  }
});

// Check if basket catches the heart
function checkCollision(heart) {
  if (heart.y + heart.height > basket.y &&
      heart.x + heart.width > basket.x &&
      heart.x < basket.x + basket.width) {
    return true;
  }
  return false;
}

// Game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the basket
  drawBasket();

  // Create new hearts
  if (Math.random() < 0.05) {
    hearts.push(createHeart());
  }

  // Update and draw hearts
  hearts.forEach((heart, index) => {
    heart.y += heart.speed;
    drawHeart(heart);

    // Check if heart is caught
    if (checkCollision(heart)) {
      hearts.splice(index, 1); // Remove heart from array
      score++;
      document.getElementById('score').textContent = score;
    }

    // Remove heart if it falls off the screen
    if (heart.y > canvas.height) {
      hearts.splice(index, 1);
    }
  });

  // Game Over when 10 hearts fall without catching
  if (hearts.length > 10) {
    alert('Game Over! You scored: ' + score);
    document.location.reload();
  }

  requestAnimationFrame(update);
}

// Start the game
update();
