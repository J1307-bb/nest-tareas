import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({
        unique: true,
        index: true
    })
    idUser: string

    @Prop({
        index: true
    })
    email: string

    @Prop({
        index: true
    })
    name: string

    @Prop({
        index: true,
    })
    password: string

}

export const UserSchema = SchemaFactory.createForClass(User)