import { Component } from '@angular/core';
import { ItemModel } from 'src/app/models/item';
import { InteropsService } from 'src/app/services/interops.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {

  Show = false;
  Item: ItemModel = new ItemModel();
  CallBack: (res: string) => void = (res: string) => {};

  constructor(private inter: InteropsService) {
    const that = this;

    inter.EditItem = (item: ItemModel, CallBack: (res: string) => void) => {
      that.Show = true;
      that.Item = item;

      that.CallBack = CallBack;
    };

  }

  End(res: string): void {
    this.Show = false;
    this.CallBack(res);
  }
}
