import { Game } from './game/game';
import { NewGame } from './new-game/new-game';
import { Routes } from '@angular/router';
import { gameGuard } from './guards';

export const routes: Routes = [
  // Default route redirects to New Game
  {
    path: '',
    redirectTo: 'new-game',
    pathMatch: 'prefix'
  },
  // New Game route
  {
    path: 'new-game',
    component: NewGame
  },
  // Game route protected by the gameGuard
  {
    path: 'game',
    component: Game,
    canActivate: [gameGuard]
  },
  // Fallback route
  {
    path: '**',
    redirectTo: 'new-game'
  }
];
