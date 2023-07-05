import TeamModel from '../database/models/TeamModel';
import IMatch from '../Interfaces/Matches';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchService {
  static async getMatches(): Promise<IMatch[] | null> {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
    });
    return matches;
  }

  static async getInProgressMatches(): Promise<IMatch[] | null> {
    const inProgressMatches = await MatchesModel.findAll({
      where: { inProgress: true },
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
    });
    return inProgressMatches;
  }

  static async getFinishedMatches(): Promise<IMatch[] | null> {
    const finishedMatches = await MatchesModel.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
    });
    return finishedMatches;
  }
}
