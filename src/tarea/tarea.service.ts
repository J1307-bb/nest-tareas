import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tarea } from './entities/tarea.entity';
import { Model } from 'mongoose';
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

    const tarea = await this.tareaModel.create(createTareaDto)
    return tarea
/*     try {
      console.log(createTareaDto);
      const tarea = await this.tareaModel.create(createTareaDto)
      return tarea;

    } catch (error) {
      this.handleExeceptions(error)
    } */

    return createTareaDto
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto

    return this.tareaModel.find()
      .limit(limit)
      .skip(offset)
  }

  findOne(id: number) {
    return `This action returns a #${id} tarea`;
  }

  update(id: number, updateTareaDto: UpdateTareaDto) {
    return `This action updates a #${id} tarea`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarea`;
  }

  private handleExeceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Tarea ya existente en la BD ${JSON.stringify(error.keyValue)}`)
    }
    console.error(error)
    throw new InternalServerErrorException(`No se pudo crear la Tarea - Check server logs`)
  }

}
