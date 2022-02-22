import { Component, Input, OnInit } from '@angular/core';
import { DcuplList } from '@dcupl/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  @Input() list!: DcuplList;

  public search$ = new Subject<string>();

  constructor() {}

  ngOnInit() {
    this.init();
  }

  private init() {
    this.search$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(async (value: string) => {
        await this.list.catalog.applyTextFilter({
          filterId: 'title',
          text: value,
        });
      });
  }

  public keyUp(input: HTMLInputElement) {
    this.search$.next(input.value);
  }
}
