import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { CustomLogger } from '../../base/logger/logger.service';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(private http: HttpService, private logger: CustomLogger) {
  }
  public getProducts(): Observable<boolean> {
    return this.http.get('https://eve.theiconic.com.au/catalog/products?gender=female&page=1&page_size=100&sort=popularity')
    .pipe(
      map((response: any) => {
        try {
          response?.data?._embedded?.product?.sort((current, next) => next.video_count - current.video_count);
          const result = response?.data?._embedded?.product?.map(({sku, video_count, ...rest}: any)  => {
            fs.appendFileSync('out.json', JSON.stringify({
              videoUrl: video_count ? `https://eve.theiconic.com.au/products/${sku}/videos` : '',
              sku,
              video_count,
              ...rest,
            }));
            fs.appendFileSync('out.json', `\n`);
            return sku;
          });
          return true;
        } catch (exception) {
          this.logger.log('External api exception', exception);
          return false;
        }
      }),
    );
  }
}
