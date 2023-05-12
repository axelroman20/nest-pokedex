import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(body: CreatePokemonDto) {
    body.name = body.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(body);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const pokemon = await this.pokemonModel.find();
    return pokemon;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }
    if (!pokemon) {
      throw new BadRequestException(`Pokemon not found`);
    }
    return pokemon;
  }

  async update(term: string, body: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (body.name) body.name = body.name.toLocaleLowerCase();
    try {
      await pokemon.updateOne(body);
      return { ...pokemon.toJSON(), ...body };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const result = await this.pokemonModel.deleteOne({
      _id: id,
    });
    if (result.deletedCount === 0) {
      throw new BadRequestException(`Pokemon not found`);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists: ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't update pokemon - Check server logs`,
    );
  }
}
