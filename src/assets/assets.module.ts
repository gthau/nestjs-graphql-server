import { Module } from '@nestjs/common';
import { AssetsResolver } from './assets.resolver';

@Module({
  providers: [AssetsResolver],
})
export class AssetsModule {}
