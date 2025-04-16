import { cities } from "../const";
import { User } from "./user";

export type Offer = {
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  rating: number;
  price: number;
  previewImage: string;
  isPremium: boolean;
  isFavorite: boolean;
  id: number;
  city: City;
  location: Location;
  bedrooms: number;
  description: string;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}

export type FavoriteAuth = Pick<Offer, 'id'> & { status: 1 | 0 };

export type CityName = typeof cities[number];

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: CityName;
  location: Location;
}
