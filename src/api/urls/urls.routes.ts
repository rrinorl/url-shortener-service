import express from 'express';
import * as controller from './urls.controller';
import { handleAsync } from "../../utils/middleware";

const router = express.Router();

export = router;

router.post('/urls', handleAsync(controller.post));
router.get('/:hash', handleAsync(controller.get));
