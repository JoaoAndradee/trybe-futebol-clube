import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const teamsRouter = Router();

// const teamController = new TeamController();

teamsRouter.get(
  '/',
  TeamController.getAll,
);

teamsRouter.get(
  '/:id',
  TeamController.getById,
);

export default teamsRouter;
