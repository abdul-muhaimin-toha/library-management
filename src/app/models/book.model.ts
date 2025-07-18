import { model, Schema } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

const bookSchema = new Schema<IBook>(
   {
      title: {
         type: String,
         required: [true, 'Title is required'],
         trim: true,
      },
      author: {
         type: String,
         required: [true, 'Author is required'],
         trim: true,
      },
      genre: {
         type: String,
         required: [true, 'Genre is required'],
         enum: {
            values: [
               'FICTION',
               'NON_FICTION',
               'SCIENCE',
               'HISTORY',
               'BIOGRAPHY',
               'FANTASY',
            ],
            message:
               'Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY',
         },
         uppercase: true,
         trim: true,
      },
      isbn: {
         type: String,
         required: [true, 'ISBN is required'],
         unique: true,
         trim: true,
      },
      description: { type: String, trim: true },
      copies: {
         type: Number,
         required: [true, 'Copies field is required'],
         min: [0, 'Copies cannot be negative'],
      },
      available: { type: Boolean, default: true },
   },
   { timestamps: true, versionKey: false }
);

export const Book = model<IBook>('Book', bookSchema);
