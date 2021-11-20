import { Injectable } from '@nestjs/common';
import { array } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import fetch from 'node-fetch';
import { Asset } from 'src/schema.gql';

export interface AssetsResponse {
  status: unknown;
  data: Asset[];
}

export interface AssetResponse {
  status: unknown;
  data: Asset;
}

const ALL_ASSETS_URL = 'https://data.messari.io/api/v2/assets';
const ASSET_URL = 'https://data.messari.io/api/v1/assets';

function assetUrl(symbol: string) {
  return [ASSET_URL, symbol].join('/');
}

@Injectable()
export class AssetsFetcher {
  public fetch(): TE.TaskEither<Error, Asset[]> {
    return pipe(
      TE.tryCatch(
        () => fetch(ALL_ASSETS_URL).then((res) => res.json()),
        (e) => new Error(String(e)),
      ),
      TE.map((r) => (r as unknown as AssetsResponse).data),
    );
  }

  public assetsBySymbols(symbols: string[]): TE.TaskEither<Error, Asset[]> {
    const queries = symbols.map((s) => this.makeAssetQuery(s));
    return pipe(
      array.sequence(TE.ApplicativePar)(queries),
      TE.map((as) => as.filter((a) => !!a)),
    );
  }

  private makeAssetQuery(symbol: string): TE.TaskEither<Error, Asset> {
    return pipe(
      TE.tryCatch(
        () => fetch(assetUrl(symbol)).then((res) => res.json()),
        (e) => new Error(String(e)),
      ),
      TE.map((r) => (r as unknown as AssetResponse).data),
    );
  }
}
