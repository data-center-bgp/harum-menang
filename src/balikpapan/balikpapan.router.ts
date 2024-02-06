import express, { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma.service';
import { BalikpapanService } from './balikpapan.service';
import { BalikpapanGuard } from './balikpapan.guard';

const prismaService = new PrismaService();
const balikpapanService = new BalikpapanService(prismaService);
const balikpapanGuard = new BalikpapanGuard();
const balikpapanRouter = express.Router();

interface CustomRequest extends Request {
    id: number  ;
}

const authenticationMiddleware = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = String(
            req.headers['authorization']?.split(' ')[1].replace("'", "")
        );
        const checkToken = balikpapanGuard.authentication(token);
        if (checkToken) {
            req.id = checkToken.id;
            next();
        } else {
            res.status(401).json('Invalid token!');
        }
    } catch (err) {
        req.id = 0;
        res.status(500).json('Error authenticating!');
    }
};

const authorizationMiddleware = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = String(
            req.headers['authorization']?.split(' ')[1].replace("'", "")
        );
        const checkToken = balikpapanGuard.authentication(token);
        if (checkToken) {
            const checkAuthorization = balikpapanGuard.authorization(req.id, token);
            if (checkAuthorization) {
                next();
            } else {
                res.status(403).json('Unauthorized!');
            }
        } else {
            res.status(401).json('Invalid token!');
        }
    } catch (err) {
        res.status(500).json('Error authenticating!');
    }
};

balikpapanRouter.get('/', authenticationMiddleware, authorizationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
try {
    const response = await balikpapanService.getAllBalikpapanData();
    res.status(response.code).json(response.response);
} catch (err) {
    res.status(500).json('Internal Server Error!');
}
});

balikpapanRouter.get('/nik/:nik', authenticationMiddleware, authorizationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await balikpapanService.getBalikpapanDataByNIK(req.params.nik);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json('Internal Server Error!')
    }
});

balikpapanRouter.get('/nkk/:nkk', authenticationMiddleware, authorizationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await balikpapanService.getBalikpapanDataByNKK(req.params.nkk);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json('Internal Server Error!')
    }
});

export { balikpapanRouter };