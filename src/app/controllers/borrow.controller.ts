import { Request, Response, Router } from 'express';
import { borrowSchema } from '../validations/borrow.validation';
import { Borrow } from '../models/borrow.model';
import { IBorrow } from '../interfaces/borrow.interface';
import { Book } from '../models/book.model';

export const borrowRoutes = Router();

borrowRoutes.post('/', async (req: Request, res: Response) => {
   try {
      const validatedData = borrowSchema.parse(req.body);

      const book = await Book.findById(validatedData.book);

      if (!book) {
         return res.status(404).send({
            success: false,
            message: 'Book not found',
         });
      }

      if (validatedData.quantity > book.copies) {
         return res.status(400).send({
            success: false,
            message: `Only ${book.copies} copies available`,
         });
      }

      if (!book.available) {
         return res.status(400).send({
            success: false,
            message: 'Book is not available for borrow',
         });
      }

      const newBorrow: IBorrow = await Borrow.create(validatedData);

      const updatedBook = await Book.updateBookCopies(
         book._id,
         validatedData.quantity
      );

      if (!updatedBook) {
         return res.status(500).send({
            success: false,
            message: 'Failed to update book copies after borrowing',
         });
      }

      res.send({
         success: true,
         message: 'Book borrowed successfully',
         data: newBorrow,
      });
   } catch (error) {
      res.status(500).send({
         success: false,
         message: 'An error occurred while borrowing',
         error,
      });
   }
});

borrowRoutes.get('/', async (_req: Request, res: Response) => {
   try {
      const summary = await Borrow.aggregate([
         {
            $group: {
               _id: '$book',
               totalQuantity: { $sum: '$quantity' },
            },
         },
         {
            $lookup: {
               from: 'books',
               localField: '_id',
               foreignField: '_id',
               as: 'bookDetails',
            },
         },
         {
            $unwind: '$bookDetails',
         },
         {
            $project: {
               book: {
                  title: '$bookDetails.title',
                  isbn: '$bookDetails.isbn',
               },
               totalQuantity: 1,
               _id: 0,
            },
         },
      ]);

      res.status(200).send({
         success: true,
         message: 'Borrowed books summary retrieved successfully',
         data: summary,
      });
   } catch (error) {
      res.status(500).send({
         success: false,
         message: 'An error occurred while retrieving summary',
         error,
      });
   }
});
