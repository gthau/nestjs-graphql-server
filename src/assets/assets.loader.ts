import * as DataLoader from 'dataloader';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { Asset } from 'src/schema.gql';
import { newError } from 'src/util/error';
import { AssetsService } from './assets.service';

export function createAssetsLoader(assetsService: AssetsService) {
  return new DataLoader<string, E.Either<Error, O.Option<Asset>>>(
    (symbols: string[]) => {
      return pipe(
        assetsService.getAll(),
        TE.map((assets) => symbols.map((s) => O.fromNullable(assets.find((a) => a.symbol === s)))),
        TE.foldW(
          (e) => T.of(symbols.map((_) => E.left(newError(e)))),
          (assets) => T.of(assets.map((a) => E.right(a))),
        ),
      )();
    },
    {
      batch: true,
      cache: true,
    },
  );
}
