import { Module } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { TareaController } from './tarea.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarea, TareaSchema } from './entities/tarea.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [TareaController],
  providers: [TareaService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Tarea.name,
        schema: TareaSchema
      }
    ])
  ],
  exports: [MongooseModule]
})
export class TareaModule {}
