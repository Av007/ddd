import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

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
