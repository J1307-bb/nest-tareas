import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TareaModule } from 'src/tarea/tarea.module';


@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TareaModule,]
})
export class SeedModule {}
