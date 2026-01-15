import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  public GameCreated = signal(false);
}
