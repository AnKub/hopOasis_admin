export type CustomImage = string;

export type ProductOption = {
  id: number;
  quantity: number;
  price: number;
};

export type VolumeOption = ProductOption & { volume: number };
export type WeightOption = ProductOption & { weight: number };

export type BaseParams = {
  id: number;
  description: string;
  averageRating: number;
  ratingCount: number;
  specialOfferIds: number[];
  imageName?: CustomImage[];
};

export type BeerParams = BaseParams & {
  beerName: string;
  beerColor: string;
  imageName: CustomImage[];
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

export type OfferParams = {
  id: number;
  name: string;
  active: boolean;
  specialOfferBeers: BeerParams[];
  specialOfferCiders: CiderParams[];
  specialOfferSnacks: SnackParams[];
  specialOfferProductBundles: ProductBundleParams[];
};

export type ResourceEntity =
  | BeerParams
  | CiderParams
  | SnackParams
  | ProductBundleParams
  | OfferParams;

export type ListParams<T> = {
  data: T[];
  total: number;
};

export type OneParams<T> = {
  data: T;
};

export type DeleteParams<T> = {
  id: number;
  previousData?: T;
};

export type DeleteResult<T> = {
  data: T;
};
