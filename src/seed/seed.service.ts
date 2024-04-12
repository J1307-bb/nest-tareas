import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { TAREAS_SEED } from './data/tareas.seed';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Tarea.name)
    private readonly tareaModel: Model<Tarea>
  ){}

  async executeSeed(){

    await this.tareaModel.deleteMany({})

    const tareaToInsert : any[] = [];

    TAREAS_SEED.forEach(async ({ name, description }) => {

      //const pokemon = await this.pokemonModel.create( {name, no} );
      tareaToInsert.push( { name, description } )
      6
      
    })
    
    console.log(tareaToInsert);
    await this.tareaModel.insertMany(tareaToInsert)

    return 'Seed executed';

  }

  async removeSeed(){
    await this.tareaModel.deleteMany({})

    return 'Seed removed'
  }

}
