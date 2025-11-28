import { Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.css'
})
export class SnakeComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private box = 20;
  private canvasSize = 400;
  private snake: { x: number; y: number }[] = [{ x: 9 * this.box, y: 10 * this.box }];
  private food = { x: 0, y: 0 };
  private direction = 'RIGHT';
  private gameLoop: any;
  score = 0;
  running = false;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.spawnFood();
    this.draw();
  }

  ngOnDestroy(): void {
    clearInterval(this.gameLoop);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' && this.direction !== 'RIGHT') this.direction = 'LEFT';
    else if (event.key === 'ArrowUp' && this.direction !== 'DOWN') this.direction = 'UP';
    else if (event.key === 'ArrowRight' && this.direction !== 'LEFT') this.direction = 'RIGHT';
    else if (event.key === 'ArrowDown' && this.direction !== 'UP') this.direction = 'DOWN';
  }

  private spawnFood() {
    this.food.x = Math.floor(Math.random() * 19 + 1) * this.box;
    this.food.y = Math.floor(Math.random() * 19 + 1) * this.box;
  }

  private draw() {
    const ctx = this.ctx;
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);

    for (let i = 0; i < this.snake.length; i++) {
      ctx.fillStyle = i === 0 ? '#00ff00' : '#00cc00';
      ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
    }

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.food.x, this.food.y, this.box, this.box);

    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Puntos: ' + this.score, 10, this.canvasSize - 10);
  }

  private update() {
    const head = { ...this.snake[0] };

    if (this.direction === 'LEFT') head.x -= this.box;
    if (this.direction === 'UP') head.y -= this.box;
    if (this.direction === 'RIGHT') head.x += this.box;
    if (this.direction === 'DOWN') head.y += this.box;

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      this.spawnFood();
    } else {
      this.snake.pop();
    }

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= this.canvasSize ||
      head.y >= this.canvasSize ||
      this.snake.some((part) => part.x === head.x && part.y === head.y)
    ) {
      this.stopGame();
      alert('💀 ¡Perdiste! Puntuación: ' + this.score);
      return;
    }

    this.snake.unshift(head);
  }

  startGame() {
    this.running = true;
    this.snake = [{ x: 9 * this.box, y: 10 * this.box }];
    this.direction = 'RIGHT';
    this.score = 0;

    this.gameLoop = setInterval(() => {
      this.update();
      this.draw();
    }, 120);
  }

  stopGame() {
    this.running = false;
    clearInterval(this.gameLoop);
  }
}
