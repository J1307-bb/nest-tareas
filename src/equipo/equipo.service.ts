import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Equipo } from './entities/equipo.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid'

@Injectable()
export class EquipoService {

  constructor(

    @InjectModel(Equipo.name)
    private readonly equipoModel: Model<Equipo>,
    private readonly configService: ConfigService

  ){}

  async create(createEquipoDto: CreateEquipoDto) {
    createEquipoDto.id_equipo = await uuid()

    try {
      console.log(createEquipoDto);
      const proyecto = await this.equipoModel.create(createEquipoDto)
      return proyecto;

    } catch (error) {
      this.handleExeceptions(error)
    }
  }

  findAllUser(id: string) {
    return this.equipoModel.find({ miembros: id });
  }

  async findOne(id: string) {
    let equipo: Equipo
    
    if (id) {
      equipo = await this.equipoModel.findOne({ id_equipo: id })
    }

    //Name
    if (!isValidObjectId(id)) {
      equipo = await this.equipoModel.findOne({ name_equipo: id.trim() })
    }

    if (!equipo) {
      throw new NotFoundException(`Equipo con id ${id} no existe`)
    }

    return equipo
  }

  async update(id: string, updateEquipoDto: UpdateEquipoDto) {
    const equipo = await this.findOne(id)

    try {

      await equipo.updateOne(updateEquipoDto)
      return { ...equipo.toJSON(), ...updateEquipoDto }

    } catch (error) {
      this.handleExeceptions(error)
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.equipoModel.deleteOne({ id_equipo: id })

    if (deletedCount === 0) {
      throw new BadRequestException(`Equipo con id ${id} no encontrado`)
    }

    return 'Equipo eliminado'
  }

  private handleExeceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Equipo ya existente en la BD ${JSON.stringify(error.keyValue)}`)
    }
    console.error(error)
    throw new InternalServerErrorException(`No se pudo crear el Equipo - Check server logs`)
  }

}
