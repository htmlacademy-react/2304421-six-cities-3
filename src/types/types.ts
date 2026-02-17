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

export type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}
