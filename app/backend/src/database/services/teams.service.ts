import TeamModel from '../models/TeamModel';

class TeamService {
  public static async getAll() {
    const teams = await TeamModel.findAll();
    return teams;
  }

  public static async getById(id: number) {
    const team = TeamModel.findOne({
      where: { id },
    });
    return team;
  }
}

export default TeamService;
