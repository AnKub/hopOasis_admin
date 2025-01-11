import { Identifier } from 'react-admin';

export type ProductOption = {
  id: Identifier;
  productId: Identifier;  // Added productId to link options to the correct product
  quantity: number;
  price: number;
};

export interface CustomImage {
  url: string;
  name: string;
}

export type VolumeOption = ProductOption & { volume: number };
export type WeightOption = ProductOption & { volume: number };

export type BaseParams = {
  id: Identifier;
  description: string;
  averageRating: number;
  ratingCount: number;
  specialOfferIds: Identifier[];
  imageName?: CustomImage[];
};

export type BeerParams = BaseParams & {
  beerName: string;
  beerColor: string;
  itemType: 'BEER';
  options: VolumeOption[];
};

export type CiderParams = BaseParams & {
  ciderName: string;
  ciderImageName: CustomImage[];
  itemType: 'CIDER';
  options: VolumeOption[];
};

export type SnackParams = BaseParams & {
  snackName: string;
  snackImageName: CustomImage[];
  itemType: 'SNACK';
  options: WeightOption[];
};

export type ProductBundleParams = BaseParams & {
  name: string;
  productImageName: CustomImage[];
  itemType: 'PRODUCT_BUNDLE';
  options: ProductOption[];
};
