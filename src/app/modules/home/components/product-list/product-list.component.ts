import { Component, Input, OnInit } from '@angular/core';
import { DcuplList, ListMetadata } from '@dcupl/core';

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
    /**
     * We get the first 10 items.
     * Properties: We load all properties of the listItem -> $ : true
     * AND also return all the properties of the linked author field -> author: { $: true }
     */

    this.books = (
      await this.list.catalog.getItems({
        start: 0,
        count: 10,
        properties: { $: true, author: { $: true } },
      })
    ).result!;

    this.meta = (await this.list.catalog.getMetadata()).result!;
  }
}
