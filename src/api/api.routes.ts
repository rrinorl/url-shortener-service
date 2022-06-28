import { Router } from 'express';
import { errorHandler } from '../utils/middleware';
import urlsRoutes from './urls/urls.routes';

const router = Router();

export = router;

router.use('/', urlsRoutes);

// Global error handler
router.use(errorHandler);
