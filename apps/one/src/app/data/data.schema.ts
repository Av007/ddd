import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class Data {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  authors: string[];

  @IsString()
  publisher: string;
}
