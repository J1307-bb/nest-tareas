import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Tarea extends Document{

    @Prop({
        unique: true,
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
    id_creator:  number;

}

export const TareaSchema = SchemaFactory.createForClass(Tarea);