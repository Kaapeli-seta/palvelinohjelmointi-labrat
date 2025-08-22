import mongoose from 'mongoose';
import {Category} from '../../types/localtypes';

const categorySchema = new mongoose.Schema<Category>({
  category_name: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
});

export default mongoose.model<Category>('Category', categorySchema);
