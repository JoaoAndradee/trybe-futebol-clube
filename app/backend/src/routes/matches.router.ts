import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const teamsRouter = Router();

teamsRouter.get(
  '/',
  MatchesController.getMatches,
);

export default teamsRouter;
