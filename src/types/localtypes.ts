import {Types} from 'mongoose';
import {Point} from 'geojson';
export type Category = {
  category_name: string;
};

export type Species = {
  species_name: string;
  category: Types.ObjectId;
  image: string;
  location: Point;
};

export type Animals = {
  animals_name: string;
  species: Types.ObjectId;
  birthdate: Date;
  location: Point;
};
