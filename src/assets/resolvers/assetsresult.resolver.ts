import { ResolveField, Resolver } from '@nestjs/graphql';

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
