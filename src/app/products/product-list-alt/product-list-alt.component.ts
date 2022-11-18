import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { catchError, EMPTY, Subject, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent implements OnDestroy {
  pageTitle = 'Products';
  private errorMessageSubject=new Subject<String>();
  errorMessage$=this.errorMessageSubject.asObservable();
  

  products$=this.productService.productsWithCategory$ 
  .pipe(
    catchError(err=>{
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
   );

   selectedProduct$=this.productService.selectedProduct$;

  products: Product[] = [];
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
