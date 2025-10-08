import { CategoryType } from './categoryType';

export interface ProductType {
    id: number;
    name: string;
    price: number;
    image: string;
    category: CategoryType;
}