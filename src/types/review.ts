import { Offer } from './offer';
import { User } from './user';

export type Review = {
  comment: string;
  date: string;
  rating: number;
  id: number;
  user: User;
}

export type ReviewAuth = Pick<Review, 'comment' | 'rating'> & Pick<Offer, 'id'>;
