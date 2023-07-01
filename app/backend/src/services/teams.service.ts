import ITeam from '../Interfaces/Team';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  static async getAll(): Promise<ITeam[] | null> {
    const result = await TeamModel.findAll();
    return result;
  }

  static async getById(id: number): Promise<ITeam | null> {
    const result = await TeamModel.findOne({
      where: { id },
    });
    return result;
  }
}
