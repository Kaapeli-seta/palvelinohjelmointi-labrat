import {NextFunction, Request, Response} from 'express';
import {Category} from '../../types/localtypes';
import {MessageResponse} from '../../types/Messages';
import categoryModel from '../models/categoryModel';
import CustomError from '../../classes/CustomError';

type DBMessageResponse = MessageResponse & {
  data: Category;
};

const getCategories = async (
  req: Request,
  res: Response<Category[]>,
  next: NextFunction,
) => {
  try {
    res.json(await categoryModel.find());
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const postCategory = async (
  req: Request<object, object, Category>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const newCategory = new categoryModel(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json({
      message: 'Category created',
      data: savedCategory,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getCategory = async (
  req: Request<{id: string}>,
  res: Response<Category>,
  next: NextFunction,
) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      next(new CustomError('Category not found', 404));
      return;
    }
    res.json(category);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const putCategory = async (
  req: Request<{id: string}, object, Category>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
    );

    if (!updatedCategory) {
      next(new CustomError('Category not found', 404));
      return;
    }
    res.json({
      message: 'Category updated',
      data: updatedCategory,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const deletedCategory = async (
  req: Request<{id: string}>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedCategory) {
      next(new CustomError('Category not found', 404));
      return;
    }
    res.json({
      message: 'Category deleted',
      data: deletedCategory,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {postCategory, getCategories, getCategory, putCategory, deletedCategory};
