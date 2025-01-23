import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop({type: [String]})
  authors: string[];

  @Prop()
  publisher: string;
}

export const DataSchema = SchemaFactory.createForClass(Data);
