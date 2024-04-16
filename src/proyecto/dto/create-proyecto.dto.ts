import { IsString, MinLength } from "class-validator"

export class CreateProyectoDto {

    @IsString()
    @MinLength(1)
    id_proyecto: string

    @IsString()
    @MinLength(1)
    name_proyecto: string

    @IsString()
    @MinLength(1)
    id_equipo: string

}
