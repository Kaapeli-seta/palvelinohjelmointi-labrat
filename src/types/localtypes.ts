import {Types, Model} from 'mongoose';
import {Point} from 'geojson';
export type Category = {
  category_name: string;
};

export type Species = {
  species_name: string;
  category: Types.ObjectId | Category;
  image: string;
  location: Point;
};

export type Animals = {
  animals_name: string;
  species: Types.ObjectId | Species;
  birthdate: Date;
  location: Point;
};

export type AnimalModel = Model<Animals> & {
  findBySpecies: (species: string) => Promise<Animals[]>;
};
