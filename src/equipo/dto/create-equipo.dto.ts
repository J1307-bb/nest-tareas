import { IsArray, IsString, MinLength } from "class-validator"

export class CreateEquipoDto {

    id_equipo: string

    @IsString()
    @MinLength(1)
    name_equipo: string
    
    @IsArray()
    miembros: []
}
