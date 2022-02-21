import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProductSearchComponent } from './components/product-search/product-search.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, ProductListComponent, ProductSearchComponent],
})
export class HomeModule {}
