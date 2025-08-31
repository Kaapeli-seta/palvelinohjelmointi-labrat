import express from 'express';
import {
  deletedCategory,
  getCategories,
  getCategory,
  postCategory,
  putCategory,
} from '../controllers/categoryController';

const router = express.Router();

router.route('/').get(getCategories).post(postCategory);

router.route('/:id').get(getCategory).put(putCategory).delete(deletedCategory);

export default router;
