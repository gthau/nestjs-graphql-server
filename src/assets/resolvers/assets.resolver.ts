import { Args, Query, Resolver } from '@nestjs/graphql';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { Asset, AssetInput, AssetResult } from 'src/schema.gql';
import { AssetsService } from '../assets.service';

@Resolver()
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query()
  asset(@Args('input') { symbol }: AssetInput): Promise<AssetResult> {
    //// option1: null when asset not found
    // return pipe(
    //   this.assetsService.get(symbol),
    //   TE.map(O.toNullable),
    //   TE.foldW(
    //     (e) => T.of({ error: e.message }),
    //     (a) => T.of({ asset: a }),
    //   ),
    // )();

    //// option2: default asset when asset not found
    // return pipe(
    //   this.assetsService.get(symbol),
    //   TE.map(O.getOrElseW(() => this.getDefaultAsset())),
    //   TE.foldW(
    //     (e) => T.of({ error: e.message }),
    //     (a) => T.of({ asset: a }),
    //   ),
    // )();

    // option3: AssetNotFound type when asset not found
    return pipe(
      this.assetsService.get(symbol),
      TE.foldW(
        (e) => T.of({ error: e.message }), // AssetError
        (oa) =>
          pipe(
            oa,
            O.map((a) => ({ asset: a })), // AssetResponse
            O.getOrElseW(() => ({ symbol })), // AssetNotFound
            T.of,
          ),
      ),
    )();
  }

  private getDefaultAsset(): Asset {
    return {
      id: '0',
      name: 'Unknown coin',
      slug: 'unknowncoin',
      symbol: 'UKNC',
    };
  }
}