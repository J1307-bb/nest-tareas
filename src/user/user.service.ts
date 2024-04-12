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

  findAll() {
    return this.userModel.find()
  }

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
      throw new NotFoundException(`Pokemon with id, name or "${term}" not found`)
    }

    return user
  }

  async login(userL: any){
    let user: User

    user = await this.userModel.findOne({ email: userL.email.toLocaleLowerCase().trim(), password: userL.password.toLocaleLowerCase().trim() })

    if (!user) {
      throw new NotFoundException(`Email y/o Password incorrectos`)
    }

    return user

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id })

    if (deletedCount === 0) {
      throw new BadRequestException(`Usuario con id ${id} no encontrado`)
    }

    return
  }

  private handleExeceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.error(error)
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
  }
}
