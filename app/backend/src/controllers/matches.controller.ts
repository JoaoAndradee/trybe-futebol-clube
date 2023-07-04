import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

export default class TeamController {
  static async getMatches(_req: Request, res: Response) {
    const allMatches = await MatchService.getMatches();
    return res.status(200).json(allMatches);
  }
}
