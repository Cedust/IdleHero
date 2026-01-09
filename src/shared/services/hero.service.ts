import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  public Name = signal('Hero');
  public Class = signal('Wizard');
}
