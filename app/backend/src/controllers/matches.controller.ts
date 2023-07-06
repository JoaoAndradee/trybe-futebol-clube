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

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    console.log('id: ', id);
    await MatchService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Mensagem qualquer' });
  }

  static async insertMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const response = await MatchService
      .insertMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return res.status(201).json(response);
  }
}
