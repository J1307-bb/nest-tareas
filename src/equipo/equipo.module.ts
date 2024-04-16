import { Module } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipo, EquipoSchema } from './entities/equipo.entity';

@Module({
  controllers: [EquipoController],
  providers: [EquipoService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Equipo.name,
        schema: EquipoSchema
      }
    ])
  ],
  exports: [MongooseModule]
})
export class EquipoModule {}
