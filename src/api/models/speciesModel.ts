import mongoose from 'mongoose';
import {Species} from '../../types/localtypes';

const speciesSchema = new mongoose.Schema<Species>({
  species_name: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {},
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

export default mongoose.model<Species>('Species', speciesSchema);
