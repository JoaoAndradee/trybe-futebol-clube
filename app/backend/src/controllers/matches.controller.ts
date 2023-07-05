import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

export default class TeamController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      console.log('entrou no if');
      const inProgressMatches = await MatchService.getInProgressMatches();
      return res.status(200).json(inProgressMatches);
    }
    if (inProgress === 'false') {
      const finishedMatches = await MatchService.getFinishedMatches();
      return res.status(200).json(finishedMatches);
    }
    const allMatches = await MatchService.getMatches();
    return res.status(200).json(allMatches);
  }
}
