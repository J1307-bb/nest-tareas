import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid'

@Injectable()
export class UserService {


  constructor(

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

  ){}

  //Crear un usuario
  async create(createUserDto: CreateUserDto) {
    createUserDto.idUser = await uuid()
    createUserDto.email = createUserDto.email.toLocaleLowerCase()

    try {
      const user = await this.userModel.create( createUserDto );
      return user;
      
    } catch (error) {
      this.handleExeceptions(error)      
    }
  }

  // Obtener todos los usuarios
  async findAll() {

    const users = await this.userModel.find().exec();
    return users.map(user => ({
      idUser: user.idUser,
      name: user.name,
      email: user.email,
    }));

  }

  // Obtener un usuario por idUser, MongoID ó Email
  async findOne(term: string){
    let user: User;

    // idUser.
    if ( !isNaN(+term)) {
      user = await this.userModel.findOne({ idUser: term })
    }

    //MongoID
    if ( !user && isValidObjectId(term) ) {
      user = await this.userModel.findById( term )
    }

    //Email
    if (!user) {
      user = await this.userModel.findOne({ email: term.toLowerCase().trim() })
    }

    if (!user) {
      throw new NotFoundException(`Usuario con email o id ${term} no existe`)
    }

    return user
  }

  // Login de usuario
  async login(userL: any){
    let user: User

    user = await this.userModel.findOne({ email: userL.email.toLowerCase().trim(), password: userL.password.toLowerCase().trim() })

    if (!user) {
      throw new NotFoundException(`Email y/o Password incorrectos`)
    }

    return {
      idUser: user.idUser,
      name: user.name,
      email: user.email
    }

  }

  // Actualizar usuario
  async update(term: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(term)

    if(updateUserDto.email)
      updateUserDto.email = updateUserDto.email.toLowerCase()

    try {

      await user.updateOne(updateUserDto)
      return { ...user.toJSON(), ...updateUserDto }

    } catch (error) {
      this.handleExeceptions(error)
    }
  }

  //Eliminar un usuario
  async remove(id: number) {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id })

    if (deletedCount === 0) {
      throw new BadRequestException(`Usuario con id ${id} no encontrado`)
    }

    return
  }

  private handleExeceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Usuario ya existe en la BD ${JSON.stringify(error.keyValue)}`)
    }
    console.error(error)
    throw new InternalServerErrorException(`No se puede crear el usuario - Check server logs`)
  }
}
