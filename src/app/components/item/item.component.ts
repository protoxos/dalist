import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() Item: ItemModel = new ItemModel();

  constructor() { }

  ngOnInit(): void {
  }

}
