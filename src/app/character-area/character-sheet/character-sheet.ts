import { Component } from '@angular/core';
import { Info } from './info/info';
import { Stats } from './stats/stats';
import { StatsService } from '../../../shared/services';

@Component({
  selector: 'app-character-sheet',
  imports: [Info, Stats],
  templateUrl: './character-sheet.html',
  styleUrl: './character-sheet.scss'
})
export class CharacterSheet {
  constructor(protected statsService: StatsService) {}
}
