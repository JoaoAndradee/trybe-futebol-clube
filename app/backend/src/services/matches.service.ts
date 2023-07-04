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
}
