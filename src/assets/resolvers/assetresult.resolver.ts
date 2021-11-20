import { ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('AssetResult')
export class AssetResultResolver {
  @ResolveField()
  __resolveType(value) {
    if (Object.keys(value).includes('asset')) {
      return 'AssetResponse';
    }
    if (Object.keys(value).includes('error')) {
      return 'AssetError';
    }
    return 'AssetNotFound';
  }
}
