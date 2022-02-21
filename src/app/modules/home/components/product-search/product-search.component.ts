import { Component, Input, OnInit } from '@angular/core';
import { DcuplList, Suggestion } from '@dcupl/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  @Input() list!: DcuplList;

  public search$ = new Subject<string>();

  public suggestions: Suggestion[] = [];

  constructor() {}

  ngOnInit() {
    this.init();
  }

  private init() {
    this.search$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(async (value: string) => {
        await this.list.catalog.applyFilterText({
          filterId: 'title',
          text: value,
        });
      });
  }

  public keyUp(input: HTMLInputElement) {
    this.search$.next(input.value);
  }

  public async getSuggestions(value: string) {
    return this.list.catalog.computeSuggestionsForSearchTerm('title', value);
  }
}
