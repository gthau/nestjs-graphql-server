import { Injectable } from '@nestjs/common';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import fetch from 'node-fetch';
import { Asset } from 'src/schema.gql';

export interface AssetsResponse {
  status: unknown;
  data: Asset[];
}

@Injectable()
export class AssetsFetcher {
  private static readonly URL = 'https://data.messari.io/api/v2/assets';

  public fetch(): TE.TaskEither<Error, Asset[]> {
    return pipe(
      TE.tryCatch(
        () => fetch(AssetsFetcher.URL).then((res) => res.json()),
        (e) => new Error(String(e)),
      ),
      TE.map((r) => (r as unknown as AssetsResponse).data),
    );
  }
}
