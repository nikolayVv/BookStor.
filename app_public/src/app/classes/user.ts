import { Rating } from './rating';
import { Comment } from './comment';
import { Book } from './book';

export class User {
  "_id": string;
  "name": string;
  "surname": string;
  "username": string;
  "password": string;
  "email": string;
  "country": string;
  "city": string;
  "address": string;
  "phoneNumber": string;
  "successfulSales": number;
  "activeSales": number;
  "joined": any;
  "profilePicture": string;
  "role": string;
  "ranking": number;
  "alreadyRanked": Rating[];
  "comments": Comment[];
  "myBooks": Book[];
}
