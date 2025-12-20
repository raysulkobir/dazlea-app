// types/category.types.ts

export interface CategoryBanner {
  banner: string;
  id?: string | number;
  name?: string;
  // Add other category properties as needed
}

export interface CategoryData {
  data: CategoryBanner[];
}

export interface CategoryState {
  data: CategoryData | null;
  loading: boolean;
  error: string | null;
}

export interface CarouselItem {
  image: {
    uri: string;
  } | any; // 'any' for require() imports
}

export interface RootState {
  categories: CategoryState;
  // Add other state slices here
}