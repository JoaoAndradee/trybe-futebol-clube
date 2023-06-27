import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

class TeamController {
  private _serviceTeam: TeamService;

  constructor(serviceTeam: TeamService = new TeamService()) {
    this._serviceTeam = serviceTeam;
  }

  public static async getAll(_req: Request, res: Response) {
    const allTeams = await TeamService.getAll();
    return res.status(200).json(allTeams);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.getById(Number(id));
    return res.status(200).json(team);
  }
}

export default TeamController;
