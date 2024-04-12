import { IsString, IsUUID, MinLength } from "class-validator"

export class CreateUserDto {

    idUser: string

    @IsString()
    @MinLength(1)
    email: string

    @IsString()
    @MinLength(1)
    name: string

    @IsString()
    @MinLength(1)
    password: string

}
