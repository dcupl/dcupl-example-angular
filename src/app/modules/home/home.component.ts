import { Component, OnInit } from '@angular/core';
import { DcuplCore, DcuplList } from '@dcupl/core';
import { DcuplBasicLoader, BasicLoaderItem } from '@dcupl/loader';

import * as loaderConfig from '../../../../bookstore/dcupl/bookstore_local.ldp.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isLoading = true;
  public showError = false;

  public dcupl = new DcuplCore();

  public list!: DcuplList;

  constructor() {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    await this.initLoader();
    await this.initList();
  }

  private async initLoader() {
    const loader = new DcuplBasicLoader();
    this.dcupl.addLoader(loader);
    loader.addItems(loaderConfig as BasicLoaderItem[]);
    const { error } = await loader.processItems();

    if (error) {
      this.showError = true;
    }

    this.dcupl.init();
    this.isLoading = false;
  }

  private async initList() {
    const { result, error } = await this.dcupl.getList('book');

    if (error) {
      this.showError = true;
      return;
    }

    this.list = result!;
  }
}
