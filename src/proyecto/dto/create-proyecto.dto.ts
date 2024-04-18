import { IsJSON, IsNotEmpty, IsString, MinLength, isArray, isObject } from "class-validator"
import { Tarea } from "src/tarea/entities/tarea.entity"

export class CreateProyectoDto {

    id_proyecto: string

    @IsString()
    @MinLength(1)
    name_proyecto: string

    @IsString()
    @MinLength(1)
    id_equipo: string

    @IsString()
    @MinLength(1)
    status: string
    
    tareas: []

}
