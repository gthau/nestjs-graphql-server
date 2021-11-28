import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import * as E from 'fp-ts/lib/Either';
import { flow, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import {
  AllAssetsResult,
  Asset,
  AssetInput,
  AssetResult,
  AssetsInput,
  AssetsResult,
} from 'src/schema.gql';
import { AssetsService } from '../assets.service';

@Resolver()
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query()
  async asset(
    @Args('input') { symbol }: AssetInput,
    @Context('assetsLoader') assetsLoader: DataLoader<string, E.Either<Error, O.Option<Asset>>>,
  ): Promise<AssetResult> {
    return pipe(
      () => assetsLoader.load(symbol),
      TE.foldW(
        (e) => T.of({ error: e.message }), // AssetError
        flow(
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
}
