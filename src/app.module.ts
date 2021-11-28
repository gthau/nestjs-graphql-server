import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createAssetsLoader } from './assets/assets.loader';
import { AssetsModule } from './assets/assets.module';
import { AssetsService } from './assets/assets.service';

@Module({
  imports: [
    AssetsModule,
    GraphQLModule.forRootAsync({
      imports: [AssetsModule],
      useFactory: (assetsService: AssetsService) => ({
        typePaths: ['./src/**/*.gql'],
        definitions: {
          path: join(process.cwd(), './src/schema.gql.ts'),
          emitTypenameField: true,
          enumsAsTypes: true,
          customScalarTypeMapping: {
            Void: 'void',
          },
        },
        context: () => ({
          assetsLoader: createAssetsLoader(assetsService),
        }),
      }),
      inject: [AssetsService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
