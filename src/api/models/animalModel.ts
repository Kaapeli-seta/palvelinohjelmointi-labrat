import mongoose from 'mongoose';
import {Animals} from '../../types/localtypes';

const animalsSchema = new mongoose.Schema<Animals>({
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

export default mongoose.model<Animals>('Animals', animalsSchema);
