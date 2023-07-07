import TeamService from './teams.service';
import MatchService from './matches.service';
import IMatch from '../Interfaces/Matches';

export default class Leaderboard {
  static MatchesResults(matches: IMatch[] | undefined) {
    let totalVictories = 0;
    let totalLosses = 0;
    let totalDraws = 0;

    matches?.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalVictories += 1;
      } else if (match.homeTeamGoals < match.awayTeamGoals) {
        totalLosses += 1;
      } else {
        totalDraws += 1;
      }
    });

    return { totalVictories, totalLosses, totalDraws };
  }

  static matchesPlayed(id: number, finishedMatches: IMatch[] | null): IMatch[] | undefined {
    const matches = finishedMatches?.filter((e) => e.homeTeamId === id);
    return matches;
  }

  static calculateGoals(matches: IMatch[] | undefined) {
    let goalsFavor = 0;
    let goalsOwn = 0;

    matches?.forEach((item) => {
      goalsFavor += item.homeTeamGoals;
      goalsOwn += item.awayTeamGoals;
    });
    return { goalsFavor, goalsOwn };
  }

  static async getHomeClassification() {
    const teams = await TeamService.getAll();
    const finishedMatches = await MatchService.getFinishedMatches();
    return teams?.map((t) => {
      const matches = this.matchesPlayed(t.id, finishedMatches);
      const matchResult = this.MatchesResults(matches);
      const { totalVictories, totalDraws, totalLosses } = matchResult;
      const { goalsFavor, goalsOwn } = this.calculateGoals(matches);
      return {
        name: t.teamName,
        totalPoints: (totalVictories * 3) + (totalDraws * 1),
        totalGames: matches?.length,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
      };
    });
  }
}
