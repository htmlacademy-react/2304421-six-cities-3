export type Offer = {
  id: string;
  title: string;
  offerType: 'hotel' | 'house' | 'apartment' | 'room';
  rating: number;
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
}
