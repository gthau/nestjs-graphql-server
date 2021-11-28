import { Module } from '@nestjs/common';
import { AssetResultResolver } from './resolvers/assetresult.resolver';
import { AssetsCache } from './assets-cache';
import { AssetsFetcher } from './assets-fetcher';
import { AssetsResolver } from './resolvers/assets.resolver';
import { AssetsService } from './assets.service';
import { AssetsResultResolver } from './resolvers/assetsresult.resolver';
import { AllAssetsResultResolver } from './resolvers/allassetsresult.resolver';

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
