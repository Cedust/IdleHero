import { Injectable, WritableSignal, signal } from '@angular/core';

import { CharactersIconName } from '../../components';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  public Name = signal('Hero');
  public CharacterIcon: WritableSignal<CharactersIconName> = signal('dwarf');
  public readonly PrestigeLevel = signal(0);
  public readonly HighestStageReached = signal(0);

  public Prestige(atStage: number) {
    this.PrestigeLevel.update((level) => level + 1);
    this.HighestStageReached.update((highest) => Math.max(highest, atStage));
  }
}
