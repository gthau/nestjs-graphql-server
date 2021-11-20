import { Injectable } from '@nestjs/common';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import { Asset } from 'src/schema.gql';
import { AssetsCache } from './assets-cache';
import { AssetsFetcher } from './assets-fetcher';

@Injectable()
export class AssetsService {
  constructor(private readonly assetsCache: AssetsCache, private readonly assetsFetcher: AssetsFetcher) {}

  public get(symbol: string): TE.TaskEither<Error, O.Option<Asset>> {
    return pipe(
      this.assetsCache.get(symbol),
      O.fold(
        () =>
          pipe(
            this.fetchAndCacheAssets(),
            TE.map((_) => this.assetsCache.get(symbol)),
          ),
        (asset) => TE.right(O.some(asset)),
      ),
    );
  }

  private fetchAndCacheAssets(): TE.TaskEither<Error, Asset[]> {
    return pipe(
      this.assetsFetcher.fetch(),
      TE.chainFirstIOK((assets) => this.assetsCache.cache(assets)),
    );
  }
}
