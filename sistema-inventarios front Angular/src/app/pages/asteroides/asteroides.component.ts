import { Component, ViewChild, ElementRef, HostListener, OnInit } from '@angular/core';

interface Asteroid {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
}

@Component({
  selector: 'app-tetris',
  templateUrl: './asteroides.component.html',
  styleUrls: ['./asteroides.component.css']
})
export class AsteroidesComponent implements OnInit {

  @ViewChild('gameCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  ship = { x: 300, y: 350, width: 20, height: 20, dx: 0 };
  bullets: { x: number, y: number }[] = [];
  asteroids: Asteroid[] = [];
  timer: any;
  score: number = 0;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  startGame() {
    this.score = 0;
    this.ship = { x: 300, y: 350, width: 20, height: 20, dx: 0 };
    this.bullets = [];
    this.asteroids = [];
    this.createAsteroids(5);
    clearInterval(this.timer);
    this.timer = setInterval(() => this.update(), 30);
  }

  createAsteroids(count: number) {
    for(let i=0; i<count; i++) {
      this.asteroids.push({
        x: Math.random()*600,
        y: Math.random()*150,
        radius: 20 + Math.random()*20,
        dx: (Math.random()-0.5)*2,
        dy: (Math.random()-0.5)*2
      });
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if(event.key === 'ArrowLeft') this.ship.dx = -5;
    if(event.key === 'ArrowRight') this.ship.dx = 5;
    if(event.key === ' ') this.shoot();
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    if(event.key === 'ArrowLeft' || event.key === 'ArrowRight') this.ship.dx = 0;
  }

  shoot() {
    this.bullets.push({ x: this.ship.x + this.ship.width/2, y: this.ship.y });
  }

  update() {
    this.clear();
    this.moveShip();
    this.moveBullets();
    this.moveAsteroids();
    this.drawShip();
    this.drawBullets();
    this.drawAsteroids();
    this.checkCollisions();
  }

  clear() {
    this.ctx.clearRect(0,0,600,400);
  }

  moveShip() {
    this.ship.x += this.ship.dx;
    if(this.ship.x < 0) this.ship.x = 0;
    if(this.ship.x > 600 - this.ship.width) this.ship.x = 600 - this.ship.width;
  }

  drawShip() {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.moveTo(this.ship.x, this.ship.y + this.ship.height);
    this.ctx.lineTo(this.ship.x + this.ship.width/2, this.ship.y);
    this.ctx.lineTo(this.ship.x + this.ship.width, this.ship.y + this.ship.height);
    this.ctx.closePath();
    this.ctx.fill();
  }

  moveBullets() {
    this.bullets.forEach(b => b.y -= 10);
    this.bullets = this.bullets.filter(b => b.y > 0);
  }

  drawBullets() {
    this.ctx.fillStyle = 'yellow';
    this.bullets.forEach(b => {
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, 3, 0, Math.PI*2);
      this.ctx.fill();
    });
  }

  createRandomAsteroid(): Asteroid {
    return {
      x: Math.random()*600,
      y: Math.random()*150,
      radius: 20 + Math.random()*20,
      dx: (Math.random()-0.5)*2,
      dy: (Math.random()-0.5)*2
    };
  }

  moveAsteroids() {
    this.asteroids.forEach(a => {
      a.x += a.dx;
      a.y += a.dy;
      if(a.x < 0 || a.x > 600) a.dx *= -1;
      if(a.y < 0 || a.y > 400) a.dy *= -1;
    });
  }

  drawAsteroids() {
    this.ctx.fillStyle = 'red';
    this.asteroids.forEach(a => {
      this.ctx.beginPath();
      this.ctx.arc(a.x, a.y, a.radius, 0, Math.PI*2);
      this.ctx.fill();
    });
  }

  checkCollisions() {
    // bullets vs asteroids
    this.bullets.forEach((b,i) => {
      this.asteroids.forEach((a,j) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        if(Math.sqrt(dx*dx + dy*dy) < a.radius) {
          this.bullets.splice(i,1);
          this.asteroids.splice(j,1);
          this.score += 10;
          this.asteroids.push(this.createRandomAsteroid());
        }
      });
    });

    // ship vs asteroids
    this.asteroids.forEach(a => {
      const dx = this.ship.x + this.ship.width/2 - a.x;
      const dy = this.ship.y + this.ship.height/2 - a.y;
      if(Math.sqrt(dx*dx + dy*dy) < a.radius + this.ship.width/2) {
        alert('Game Over!');
        clearInterval(this.timer);
      }
    });
  }
}
