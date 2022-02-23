import { Component, OnInit } from '@angular/core';
import { DcuplCore, DcuplList } from '@dcupl/core';
import { DcuplBasicLoader } from '@dcupl/loader';

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
    loader.addItems([
      {
        url: 'http://localhost:8083/models/book.dcupl.json',
        type: 'model',
      },
      {
        url: 'http://localhost:8083/models/book_language.dcupl.json',
        type: 'model',
      },
      {
        url: 'http://localhost:8083/models/author.dcupl.json',
        type: 'model',
      },
      {
        url: 'http://localhost:8083/models/publisher.dcupl.json',
        type: 'model',
      },
      {
        url: 'http://localhost:8083/data/author.csv',
        type: 'data',
        model: 'author',
      },
      {
        url: 'http://localhost:8083/data/book.csv',
        type: 'data',
        model: 'book',
      },
      {
        url: 'http://localhost:8083/data/publisher.csv',
        type: 'data',
        model: 'publisher',
      },
    ]);
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
