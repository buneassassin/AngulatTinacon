import { Injectable } from '@angular/core';
import { Tinacos } from '../../Interface/Tinacon/tinacos';

@Injectable({
  providedIn: 'root'
})
export class TinacoBasicService {

  constructor() { }

  features:Tinacos[] = [
    { id: 1, name: 'Tinaco1', nivel_del_agua: 100,owner: 'Juan Perez', isOn: true },
    { id: 2,name: 'Tinaco2', nivel_del_agua: 50, owner: 'Maria Fernada', isOn: true},
    { id: 4, name: 'Tinaco3', nivel_del_agua: 20, owner: 'Juan Perez', isOn: false },

  ];

    // esto devuelve todos los objetos de el arreglo que tengo arriba
  getAllTinacos(): Tinacos[] {
    return this.features;
  }

  // esto devuelve el valor de el objeto con id igual a la proporcionada y si no lo encuentra devuelve undefined
  getTinacoById(id: number): Tinacos | undefined {
    return this.features.find(tinaquito => tinaquito.id === id);
  }


  
}
