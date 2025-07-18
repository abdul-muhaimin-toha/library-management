import { Request, Response, Router } from 'express';
import { Book } from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import { bookSchema } from '../validations/book.validation';

export const bookRoutes = Router();

bookRoutes.post('/', async (req: Request, res: Response) => {
   try {
      const validatedData = bookSchema.parse(req.body);
      const newBook: IBook = await Book.create(validatedData);

      res.send({
         success: true,
         message: 'book created successfully',
         data: newBook,
      });
   } catch (error) {
      res.send({
         success: false,
         message: 'Validation failed',
         error,
      });
   }
});

bookRoutes.get('/', async (req: Request, res: Response) => {
   try {
      const {
         filter,
         sortBy = 'createdAt',
         sort = 'asc',
         limit = '10',
      } = req.query as {
         filter?: string;
         sortBy?: string;
         sort?: string;
         limit?: string;
      };

      const sortOrder = sort === 'desc' ? -1 : 1;
      const limitValue = parseInt(limit);

      const query: Record<string, any> = {};
      if (filter) {
         query.genre = filter;
      }

      const books = await Book.find(query)
         .sort({ [sortBy]: sortOrder })
         .limit(limitValue);

      res.send({
         success: true,
         message: 'Books retrieved successfully',
         data: books,
      });
   } catch (error) {
      res.send({
         success: false,
         message: 'An error occurred while retrieving books',
         error: error,
      });
   }
});

bookRoutes.get('/:bookID', async (req: Request, res: Response) => {
   try {
      const bookID = req.params.bookID;
      const book: IBook | null = await Book.findById(bookID);

      res.send({
         success: true,
         message: 'Book retrieved successfully',
         data: book,
      });
   } catch (error) {
      res.send({
         success: false,
         message: 'An error occurred while retrieving book',
         error: error,
      });
   }
});

bookRoutes.patch('/:bookID', async (req: Request, res: Response) => {
   try {
      const bookID = req.params.bookID;
      const book: IBook | null = await Book.findByIdAndUpdate(
         bookID,
         req.body,
         {
            new: true,
         }
      );

      res.send({
         success: true,
         message: 'Book updated successfully',
         data: book,
      });
   } catch (error) {
      res.send({
         success: false,
         message: 'An error occurred while updating book',
         error: error,
      });
   }
});

bookRoutes.delete('/:bookID', async (req: Request, res: Response) => {
   try {
      const bookID = req.params.bookID;
      await Book.findByIdAndDelete(bookID);

      res.send({
         success: true,
         message: 'Book deleted successfully',
         data: null,
      });
   } catch (error) {
      res.send({
         success: false,
         message: 'An error occurred while deleting book',
         error: error,
      });
   }
});
