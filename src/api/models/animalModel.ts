import mongoose from 'mongoose';
import {Animals, AnimalModel} from '../../types/localtypes';

const animalSchema = new mongoose.Schema<Animals>({
  animals_name: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Species',
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
    max: Date.now(),
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      requred: true,
      index: '2dsphere',
    },
  },
});

animalSchema.statics.findBySpecies = function (species_name: string) {
  return this.aggregate([
    {
      $lookup: {
        from: 'species',
        localField: 'species',
        foreignField: '_id',
        as: 'species',
      },
    },
    {
      $unwind: '$species',
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'species.category',
        foreignField: '_id',
        as: 'species.category',
      },
    },
    {
      $unwind: '$species.category',
    },
    {
      $match: {
        'species.species_name': species_name,
      },
    },
    {
      $project: {
        __v: 0,
        'species.__v': 0,
      },
    },
  ]);
};

export default mongoose.model<Animals, AnimalModel>('Animals', animalSchema);
