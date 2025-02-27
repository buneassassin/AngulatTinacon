import { CanDeactivateFn } from '@angular/router';

export const ejemploGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
