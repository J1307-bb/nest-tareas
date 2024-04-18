import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid'
import { Tarea } from 'src/tarea/entities/tarea.entity';

@Injectable()
export class ProyectoService {

  constructor(

    @InjectModel(Proyecto.name)
    private readonly proyectoModel: Model<Proyecto>,
    private readonly configService: ConfigService

  ){}

  async create(createProyectoDto: CreateProyectoDto) {
    createProyectoDto.id_proyecto = await uuid()

    try {
      console.log(createProyectoDto);
      const proyecto = await this.proyectoModel.create(createProyectoDto)
      return proyecto;

    } catch (error) {
      this.handleExeceptions(error)
    }
  }

  async agregarTarea(id: string, tarea: any ){
    try {

      const project = await this.proyectoModel.findOne({ id_proyecto: id }).exec();
      if (!project) {
        return null; // Proyecto no encontrado
      }
  
      project.tareas.push({...tarea}) // Agregar las nuevas tareas al array existente
      await project.save();
      return project;
      
    } catch (error) {
      this.handleExeceptions(error)
    }
  }

  findAllTeam(id: string) {
    return this.proyectoModel.find({ id_equipo: id });
  }

  async findOne(id: string) {
    let proyecto: Proyecto
    
    if (id) {
      proyecto = await this.proyectoModel.findOne({ id_proyecto: id })
    }

    if (!proyecto) {
      throw new NotFoundException(`Proyecto o id ${id} no existe`)
    }

    return proyecto

  }

  async update(term: string, updateProyectoDto: UpdateProyectoDto) {
    const proyecto = await this.findOne(term)

    /* if(updateTareaDto.name)
      updateTareaDto.name = updateTareaDto.name.toLowerCase() */

    try {

      await proyecto.updateOne(updateProyectoDto)
      return { ...proyecto.toJSON(), ...updateProyectoDto }

    } catch (error) {
      this.handleExeceptions(error)
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.proyectoModel.deleteOne({ id_proyecto: id })

    if (deletedCount === 0) {
      throw new BadRequestException(`Proyecto con id ${id} no encontrado`)
    }

    return 'Proyecto eliminado'
  }

  private handleExeceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Proyecto ya existente en la BD ${JSON.stringify(error.keyValue)}`)
    }
    console.error(error)
    throw new InternalServerErrorException(`No se pudo crear el Proyecto - Check server logs`)
  }
}
