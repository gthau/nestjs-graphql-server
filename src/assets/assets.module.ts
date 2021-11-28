import { Module } from '@nestjs/common';
import { AssetsCache } from './assets-cache';
import { AssetsFetcher } from './assets-fetcher';
import { AssetsService } from './assets.service';
import { AssetsResolver } from './resolvers/assets.resolver';
import {
  AllAssetsResultResolver,
  AssetResultResolver,
  AssetsResultResolver,
} from './resolvers/union-types.resolver';

@Module({
  providers: [
    AssetsResolver,
    AssetsService,
    AssetsCache,
    AssetsFetcher,
    AssetResultResolver,
    AssetsResultResolver,
    AllAssetsResultResolver,
  ],
})
export class AssetsModule {}
