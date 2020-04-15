import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ParticlesMoving} from './particle.model';

@Component({
  selector: 'app-outbreak-simulator',
  templateUrl: './outbreak-simulator.component.html',
  styleUrls: ['./outbreak-simulator.component.scss'],
})
export class OutbreakSimulatorComponent implements OnInit, OnDestroy {

  @Input() maxHeight = 50;
  myResizeTimer = null;
  canvas: any;
  particles: ParticlesMoving;
  ctx: any;

  constructor() {
  }

  ngOnInit() {
    this.myResizeTimer = setTimeout(() => {
      this.canvas = <HTMLCanvasElement> document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.particles = new ParticlesMoving(this.canvas, this.ctx);
      this.particles.draw(this.maxHeight);

      window.onresize = () => {
        if (this.myResizeTimer != null) {
          clearTimeout(this.myResizeTimer);
        }
        this.myResizeTimer = setTimeout(() => {
          this.particles = new ParticlesMoving(this.canvas, this.ctx);
          this.particles.draw(this.maxHeight);
        }, 100);
      };
    }, 100);
  }

  ngOnDestroy(): void {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }
}
