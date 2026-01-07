import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stage-label',
  imports: [],
  templateUrl: './stage-label.html',
  styleUrl: './stage-label.scss'
})
export class StageLabel {
  @Input() stageNumber: number | null = null;
}
