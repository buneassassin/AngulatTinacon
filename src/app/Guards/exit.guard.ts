import { CanDeactivate } from '@angular/router';
import { CanComponentDeactivate } from '../Interface/Guards/can-component-deactivate';

export class ExitGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean {
    console.log('ExitGuard: canDeactivate() llamado');
    const puedeSalir = component.canExit();
    console.log('ExitGuard: Resultado de canExit():', puedeSalir);
    return puedeSalir;
  }
}