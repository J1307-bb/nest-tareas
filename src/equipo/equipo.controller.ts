import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equipoService.create(createEquipoDto);
  }

  @Get(':id')
  findAll(@Param('id') id:string) {
    return this.equipoService.findAllUser(id);
  }

  @Get('/team/:id')
  findOne(@Param('id') id: string) {
    return this.equipoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoDto: UpdateEquipoDto) {
    return this.equipoService.update(id, updateEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipoService.remove(id);
  }
}
