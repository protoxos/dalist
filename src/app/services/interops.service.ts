import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class InteropsService {

  constructor() { }
  public EditItem(item: ItemModel, CallBack: (res: string) => void): void {}
  public OpenLogin(): void {}

}
