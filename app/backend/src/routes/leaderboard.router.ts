import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get(
  '/',
  leaderboardController.getAllClassification,
);

router.get(
  '/home',
  leaderboardController.getHomeClassification,
);

router.get(
  '/away',
  leaderboardController.getAwayClassification,
);

export default router;
