import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async getHomeClassification(_req: Request, res: Response) {
    const teamsHome = await LeaderboardService.getHomeClassification();
    return res.status(200).json(teamsHome);
  }

  static async getAwayClassification(_req: Request, res: Response) {
    const teamsAway = await LeaderboardService.getAwayClassification();
    return res.status(200).json(teamsAway);
  }
}
