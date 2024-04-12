import { IsDate, IsDateString, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateTareaDto {

    @IsString()
    @MinLength(1)
    name:        string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsDateString()
    date:        string;

    @IsDateString()
    date_end:    string;

    @IsInt()
    @Min(1)
    @IsPositive()
    id_creator:  number;
}
