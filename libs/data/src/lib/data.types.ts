import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export type DataEntity = {
	id: string;
	items: DataItem[];
}

export type DataItem = {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        publisher: string;
    }
};

export class SearchQueryDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    skip?: number;
  
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number;
  }
  