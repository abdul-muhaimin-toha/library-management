import { Model, Types } from 'mongoose';

export interface IBook {
   title: string;
   author: string;
   genre:
      | 'FICTION'
      | 'NON_FICTION'
      | 'SCIENCE'
      | 'HISTORY'
      | 'BIOGRAPHY'
      | 'FANTASY';
   isbn: string;
   description?: string;
   copies: number;
   available?: boolean;
}

export interface BookModelType extends Model<IBook> {
   updateBookCopies(
      bookID: Types.ObjectId,
      quantity: number
   ): Promise<IBook | null>;
}
