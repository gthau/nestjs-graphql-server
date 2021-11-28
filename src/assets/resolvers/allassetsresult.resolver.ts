import { ResolveField, Resolver } from '@nestjs/graphql';

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
