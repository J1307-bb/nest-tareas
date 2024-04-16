import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Tarea extends Document{

    @Prop({
        index: true
    })
    name:        string;

    @Prop({
        index: true
    })
    description: string;

    @Prop({
        index: true
    })
    date:        string;

    @Prop({
        index: true
    })
    date_end:    string;

    @Prop({
        index: true
    })
    id_creator:  string;

    @Prop({
        index: true
    })
    prioridad: string

    @Prop({
        index: true
    })
    estado: string

    @Prop({
        index: true
    })
    name_proyecto: string

}

export const TareaSchema = SchemaFactory.createForClass(Tarea);