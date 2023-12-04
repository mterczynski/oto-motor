export interface SaleOffer {
  id: number
  priceInPLN: number;
  brand: string;
  model: string;
  mileageInKm: number;
  imageLink?: string | null;
  location: string;
  distanceInKm: number;
  description?: string | null;
}
