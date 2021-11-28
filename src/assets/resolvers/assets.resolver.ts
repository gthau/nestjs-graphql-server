import { Args, Query, Resolver } from '@nestjs/graphql';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { AllAssetsResult, AssetInput, AssetResult, AssetsInput, AssetsResult } from 'src/schema.gql';
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

  @Query()
  assets(@Args('input') { symbols }: AssetsInput): Promise<AssetsResult> {
    return pipe(
      this.assetsService.getBySymbols(symbols),
      TE.foldW(
        (e) => T.of({ error: e.message }), // GraphqlError
        (assets) => {
          const notFound = symbols
            .filter((s) => !assets.find((a) => a.symbol === s))
            .map((s) => ({ symbol: s }));
          return T.of({
            notFound,
            assets,
          }); // AssetsResponse
        },
      ),
    )();
  }

  @Query()
  allAssets(): Promise<AllAssetsResult> {
    return pipe(
      this.assetsService.getAll(),
      TE.foldW(
        (e) => T.of({ error: e.message }), // AssetError
        (assets) => T.of({ assets }), // AllAssetsResponse
      ),
    )();
  }

  // private getDefaultAsset(): Asset {
  //   return {
  //     id: '0',
  //     name: 'Unknown coin',
  //     slug: 'unknowncoin',
  //     symbol: 'UKNC',
  //   };
  // }
}
