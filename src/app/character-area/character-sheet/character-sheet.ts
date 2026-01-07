import { Component } from '@angular/core';
import { ExperienceBar } from '../../../shared/components';
import { Info } from './info/info';
import { PlayerService } from '../../../shared/services';
import { Stats } from './stats/stats';

@Component({
  selector: 'app-character-sheet',
  imports: [Info, Stats, ExperienceBar],
  templateUrl: './character-sheet.html',
  styleUrl: './character-sheet.scss'
})
export class CharacterSheet {
  constructor(protected playerService: PlayerService) {}
}
