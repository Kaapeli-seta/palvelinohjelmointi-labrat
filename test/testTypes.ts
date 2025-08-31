import {Animals, Category, Species} from '../src/types/localtypes';

type TestAnimal = Animals & {
  _id: string;
};

type TestSpecies = Species & {
  _id: string;
};

type TestCategory = Category & {
  _id: string;
};

export {TestAnimal, TestSpecies, TestCategory};
