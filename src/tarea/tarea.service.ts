import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tarea } from './entities/tarea.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TareaService {

  private defaultLimit: number
  
  constructor(

    @InjectModel(Tarea.name)
    private readonly tareaModel: Model<Tarea>,

    private readonly configService: ConfigService

  ){

    this.defaultLimit = configService.get<number>('defaultLimit')

  }

  // Crear una tarea
  async create(createTareaDto: CreateTareaDto) {

    try {
      console.log(createTareaDto);
      const tarea = await this.tareaModel.create(createTareaDto)
      return tarea;

    } catch (error) {
      this.handleExeceptions(error)
    }

  }

  // Obtener todas las tareas
  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto

    return this.tareaModel.find()
      .limit(limit)
      .skip(offset)
  }

  async findAllUser(id: string){
    
    return this.tareaModel.find({ id_creator: id })

  }

  //Obtener una tarea por id_creador, name o MongoID
  async findOne(term: string) {

    let tarea: Tarea;

    // id_creator
    if ( !isNaN(+term)) {
      tarea = await this.tareaModel.findOne({ id_creator: term })
    }

    //MongoID
    if ( !tarea && isValidObjectId(term) ) {
      tarea = await this.tareaModel.findById( term )
    }

    //Name
    if (!tarea) {
      tarea = await this.tareaModel.findOne({ name: term.toLowerCase().trim() })
    }

    if (!tarea) {
      throw new NotFoundException(`Tarea con id, name or "${term}" no encontrado`)
    }

    return tarea
  }

  //Actualizar una tarea 
  async update(term: string, updateTareaDto: UpdateTareaDto) {

    const tarea = await this.findOne(term)

    /* if(updateTareaDto.name)
      updateTareaDto.name = updateTareaDto.name.toLowerCase() */

    try {

      await tarea.updateOne(updateTareaDto)
      return { ...tarea.toJSON(), ...updateTareaDto }

    } catch (error) {
      this.handleExeceptions(error)
    }
  }

  //Eliminar una tarea
  async remove(id: string) {
    const { deletedCount } = await this.tareaModel.deleteOne({ _id: id })

    if (deletedCount === 0) {
      throw new BadRequestException(`Tarea con id ${id} no encontrado`)
    }

    return 'Tarea eliminada'
  }

  private handleExeceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Tarea ya existente en la BD ${JSON.stringify(error.keyValue)}`)
    }
    console.error(error)
    throw new InternalServerErrorException(`No se pudo crear la Tarea - Check server logs`)
  }

}
