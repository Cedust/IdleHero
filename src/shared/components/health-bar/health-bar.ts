import { Component, Input } from '@angular/core';

import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-health-bar',
  imports: [DecimalPipe],
  templateUrl: './health-bar.html',
  styleUrl: './health-bar.scss'
})
export class HealthBar {
  @Input() currentHealth: number = 0;
  @Input() maxHealth: number = 0;
  @Input() showHealthValues: boolean = false;

  get progress(): number {
    return Math.min(100, (this.currentHealth / this.maxHealth) * 100);
  }
}
