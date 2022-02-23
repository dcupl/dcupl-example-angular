import { Component, Input, OnInit } from '@angular/core';
import { DcuplList } from '@dcupl/core';
import { ListMetadata } from '@dcupl/core/dist/lib-esm/types/core.types';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() list!: DcuplList;

  public books: any[] = [];
  public meta!: ListMetadata;

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

    this.meta = await (await this.list.catalog.getMetadata()).result!;

    console.log(this.books);
  }
}
