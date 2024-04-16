import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Equipo extends Document {

    @Prop({
        index: true
    })
    id_equipo: string

    @Prop({
        index: true
    })
    name_equipo: string
    
    @Prop({
        index: true
    })
    miembros: string[];


}

export const EquipoSchema = SchemaFactory.createForClass(Equipo);