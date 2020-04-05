import {Component, Input, OnInit} from '@angular/core';
import {ParticlesMoving} from './particle.model';

@Component({
  selector: 'app-outbreak-simulator',
  templateUrl: './outbreak-simulator.component.html',
  styleUrls: ['./outbreak-simulator.component.scss'],
})
export class OutbreakSimulatorComponent implements OnInit {

  @Input() maxHeight = 50;
  myResizeTimer = null;

  constructor() {
  }

  ngOnInit() {
    const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    const candy = new ParticlesMoving(canvas);
    candy.draw(this.maxHeight);

    window.onresize = () => {
      if (this.myResizeTimer != null) {
        clearTimeout(this.myResizeTimer);
      }
      this.myResizeTimer = setTimeout(() => {
        candy.draw(this.maxHeight);
      }, 100);
    };
  }


}
