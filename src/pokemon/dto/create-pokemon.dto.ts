import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  @IsPositive()
  no: number;

  @IsString()
  @MinLength(1)
  name: string;
}
