import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Tarea } from "src/tarea/entities/tarea.entity";

@Schema()
export class Proyecto extends Document{

    @Prop({
        index: true
    })
    id_proyecto: string

    @Prop({
        index: true
    })
    name_proyecto: string

    @Prop({
        index: true
    })
    id_equipo: string

    @Prop({
        index: true
    })
    status: string

    @Prop({})
    tareas: Tarea[]

}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);