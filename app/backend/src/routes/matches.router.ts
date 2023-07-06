import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import validateToken from '../middlewares/tokenValidation';

const matchRouter = Router();

matchRouter.get(
  '/',
  MatchesController.getMatches,
);

matchRouter.patch(
  '/:id/finish',
  validateToken,
  MatchesController.finishMatch,
);

matchRouter.patch(
  '/:id',
  validateToken,
  MatchesController.updateMatch,
);

export default matchRouter;
