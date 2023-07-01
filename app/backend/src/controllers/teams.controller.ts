import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const allTeams = await TeamService.getAll();
    return res.status(200).json(allTeams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.getById(Number(id));
    return res.status(200).json(team);
  }
}
