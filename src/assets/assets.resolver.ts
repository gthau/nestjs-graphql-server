import { Query, Resolver } from '@nestjs/graphql';
import { AssetInput, Asset } from 'src/schema.gql';

@Resolver()
export class AssetsResolver {
  @Query()
  asset(input: AssetInput): Asset {
    return {
      id: '1',
      name: 'Bitcoin',
      slug: 'bitcoin',
      symbol: 'BTC',
    };
  }
}
