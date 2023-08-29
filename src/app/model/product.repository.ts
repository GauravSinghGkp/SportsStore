import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';
@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];
  constructor(private dataSource: StaticDataSource) {

    dataSource.getProducts().subscribe((data) => {

      this.products = data;

      this.categories = data

        .map((p) => p.category)

        .filter((c): c is string => c!== undefined)

        .filter((c, index, array) => array.indexOf(c) == index).sort();

    });

  }
  getProducts(category: string = ""): Product[] { // use an empty string as default

    return this.products

    .filter((p) => category == "" || category == p.category);

  }
  getProduct(id: number): Product | null {

    const product = this.products.find((p) => p.id == id);

    return product !== undefined ? product : null;

  }

  getCategories(): string[] {

    return this.categories;

  }
}
