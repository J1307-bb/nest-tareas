import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto, ProyectoSchema } from './entities/proyecto.entity';

@Module({
  controllers: [ProyectoController],
  providers: [ProyectoService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Proyecto.name,
        schema: ProyectoSchema
      }
    ])
  ],
  exports: [MongooseModule]
})
export class ProyectoModule {}
