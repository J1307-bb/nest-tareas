import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tarea')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Post()
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareaService.create(createTareaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.tareaService.findAll(paginationDto);
  }

  @Get('/user/:id')
  findAllUser(@Param('id') id: string){
    return this.tareaService.findAllUser(id)
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.tareaService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareaService.update(term, updateTareaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tareaService.remove(id);
  }
}
