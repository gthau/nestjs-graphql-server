import { Injectable } from '@nestjs/common';
import { IO } from 'fp-ts/lib/IO';
import * as O from 'fp-ts/lib/Option';
import { Asset } from 'src/schema.gql';

@Injectable()
export class AssetsCache {
  private assetsCache = new Map<string, Asset>();

  public get(symbol: string): O.Option<Asset> {
    return O.fromNullable(this.assetsCache.get(symbol));
  }

  public cache(assets: Asset[]): IO<void> {
    assets.forEach((a) => this.assetsCache.set(a.symbol, a));
    return;
  }
}
