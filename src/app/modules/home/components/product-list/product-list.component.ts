import { Component, Input, OnInit } from '@angular/core';
import { DcuplList } from '@dcupl/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() list!: DcuplList;

  public books: any[] = [];

  constructor() {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    this.loadData();

    this.list.onUpdate(async () => {
      this.loadData();
    });
  }

  private async loadData() {
    this.books = (
      await this.list.catalog.getItems({
        start: 0,
        count: 10,
        properties: { $: true, author: { $: true } },
      })
    ).result!;

    console.log(this.books);
  }
}
