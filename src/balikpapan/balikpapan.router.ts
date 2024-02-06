import express, { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma.service';
import { BalikpapanService } from './balikpapan.service';

const prismaService = new PrismaService();
const balikpapanService = new BalikpapanService(prismaService);
const balikpapanRouter = express.Router();

balikpapanRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const response = await balikpapanService.getAllBalikpapanData();
  res.status(response.code).json(response.response);
});

balikpapanRouter.get('/:nik', async (req: Request, res: Response, next: NextFunction) => {
  const response = await balikpapanService.getBalikpapanDataByNIK(req.params.nik);
  res.status(response.code).json(response.response);
});

balikpapanRouter.get('/nkk/:nkk', async (req: Request, res: Response, next: NextFunction) => {
  const response = await balikpapanService.getBalikpapanDataByNKK(req.params.nkk);
  res.status(response.code).json(response.response);
});

export { balikpapanRouter };