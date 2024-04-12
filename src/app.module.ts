import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TareaModule } from './tarea/tarea.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema
    }),
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname,'..','public'), 
    }),

      /* MongooseModule.forRoot('mongodb://localhost:27017/nest-tareas'), */

      MongooseModule.forRoot( process.env.MONGODB, {
        dbName: 'tareasdb'
      }),
      UserModule,

      TareaModule,

      SeedModule,
  ],
})
export class AppModule {}
