import { Component } from '@angular/core';
import { ItemModel } from './models/item';
import { ListModel } from './models/list';
import { InteropsService } from './services/interops.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  List: ListModel;

  constructor(private inter: InteropsService) {
    this.List = new ListModel();
  }

  AddItem(): void {

    const it = new ItemModel();
    const newItem = new ItemModel();

    this.inter.EditItem(it, (res) => {
      if (res === 'ok') {
        newItem.Name = it.Name;
        newItem.Bought = it.Bought;
        newItem.Price = it.Price;
        newItem.Quantity = it.Quantity;

        this.List.Items.push(newItem);
      }
    });
  }

}
