import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./src/**/*.gql'],
      definitions: {
        path: join(process.cwd(), './src/schema.gql.ts'),
        emitTypenameField: true,
        enumsAsTypes: true,
        customScalarTypeMapping: {
          Void: 'void',
        },
      },
    }),
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
