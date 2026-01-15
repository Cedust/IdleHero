import type { CanActivateFn } from '@angular/router';
import { GameStateService } from '../../shared/services';
import { inject } from '@angular/core';

export const gameGuard: CanActivateFn = (route, state) => {
  const gameStateService = inject(GameStateService);
  return gameStateService.GameCreated();
};
