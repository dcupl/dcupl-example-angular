import { Component, OnInit } from '@angular/core';
import { DcuplCore, DcuplList } from '@dcupl/core';
import { DcuplConfigLoader } from '@dcupl/loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isLoading = true;
  public showError = false;

  public dcupl = new DcuplCore({
    logs: {
      enabled: true,
    },
  });

  public list!: DcuplList;

  constructor() {}

  ngOnInit() {
    this.init();
  }

  private async init() {
    await this.initLoader();
    await this.initList();
    this.isLoading = false;
  }

  private async initLoader() {
    const loader = new DcuplConfigLoader();
    this.dcupl.addLoader(loader);

    const config = await loader.fetchConfig({
      url: 'http://localhost:8083/bookstore.dcupl.lc.json',
    });

    if (!config) {
      this.showError = true;
      return;
    }

    const { error } = await loader.process({ presetKey: 'default' });

    if (error) {
      this.showError = true;
      return;
    }

    this.dcupl.init();

    Object.defineProperty(window, 'dcupl', { value: this.dcupl });
  }

  private async initList() {
    const { result, error } = await this.dcupl.getList({ listKey: 'book' });

    if (error) {
      this.showError = true;
      return;
    }

    this.list = result!;
  }
}
