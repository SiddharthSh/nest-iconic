import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { CustomLogger } from '../../base/logger/logger.service';
@Injectable()
export class ProductService {
  constructor(private http: HttpService, private logger: CustomLogger) {
  }
  public getProducts(): Observable<any> {
    try {
      return this.http.get('https://eve.theiconic.com.au/catalog/products?gender=female&page=1&page_size=100&sort=popularity')
      .pipe(
        map((response: any) => {
          this.logger.log('External api response', response);
          const result1 = response?.data?._embedded?.product?.map(({sku, video_count, ...rest}: any)  => {
            return {
              videoUrl: `https://eve.theiconic.com.au/products/${sku}/videos`,
              sku,
              video_count,
            };
          });
          result1.sort((a, b) => b.video_count - a.video_count);
          return result1;
        }),
      ) ;
      // return response;
    } catch (exception) {
      this.logger.log('External api exception', exception);
    }
  }
}
