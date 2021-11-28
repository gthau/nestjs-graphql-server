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

@Resolver('AssetsResult')
export class AssetsResultResolver {
  @ResolveField()
  __resolveType(value) {
    if (Object.keys(value).includes('assets')) {
      return 'AssetsResponse';
    }
    if (Object.keys(value).includes('error')) {
      return 'GraphqlError';
    }
    return null;
  }
}

@Resolver('AllAssetsResult')
export class AllAssetsResultResolver {
  @ResolveField()
  __resolveType(value) {
    if (Object.keys(value).includes('assets')) {
      return 'AllAssetsResponse';
    }
    if (Object.keys(value).includes('error')) {
      return 'GraphqlError';
    }
    return null;
  }
}