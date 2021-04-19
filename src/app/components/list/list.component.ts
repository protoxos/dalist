import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item';
import { ListModel } from 'src/app/models/list';
import { InteropsService } from 'src/app/services/interops.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() List: ListModel = new ListModel();

  constructor(private inter: InteropsService) {
  }

  ngOnInit(): void {}

  GetBoughtClass(Item: ItemModel): string {
    return Item.Bought ? 'fa-square-o' : 'fa-check-square-o';
  }
  SetBought(Item: ItemModel): void {
    Item.Bought = !Item.Bought;
  }
  EditItem(item: ItemModel = new ItemModel()): void {
    const it = {...item};

    this.inter.EditItem(it, (res) => {
      if (res === 'ok') {
        item.Name = it.Name;
        item.Bought = it.Bought;
        item.Price = it.Price;
        item.Quantity = it.Quantity;
      }
    });
  }

}
