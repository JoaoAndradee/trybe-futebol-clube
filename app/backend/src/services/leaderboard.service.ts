import TeamService from './teams.service';
import MatchService from './matches.service';
import IMatch from '../Interfaces/Matches';
import ILeaderboard from '../Interfaces/Leaderboard';
import ITeam from '../Interfaces/Team';

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

  static MatchesResultsAway(matches: IMatch[] | undefined) {
    let totalVictories = 0;
    let totalLosses = 0;
    let totalDraws = 0;

    matches?.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        totalVictories += 1;
      } else if (match.awayTeamGoals < match.homeTeamGoals) {
        totalLosses += 1;
      } else {
        totalDraws += 1;
      }
    });

    return { totalVictories, totalLosses, totalDraws };
  }

  static matchesPlayedHome(id: number, finishedMatches: IMatch[] | null): IMatch[] | undefined {
    const matches = finishedMatches?.filter((e) => e.homeTeamId === id);
    return matches;
  }

  static matchesPlayedAway(id: number, finishedMatches: IMatch[] | null): IMatch[] | undefined {
    const matches = finishedMatches?.filter((e) => e.awayTeamId === id);
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

  static calculateGoalsAway(matches: IMatch[] | undefined) {
    let goalsFavor = 0;
    let goalsOwn = 0;

    matches?.forEach((item) => {
      goalsFavor += item.awayTeamGoals;
      goalsOwn += item.homeTeamGoals;
    });
    return { goalsFavor, goalsOwn };
  }

  static calculateEfficiency(win: number, draw: number, matches: number | undefined) {
    if (matches !== undefined) {
      const result = (((win * 3) + (draw * 1)) / (matches * 3)) * 100;
      return result.toFixed(2);
    }
    return undefined;
  }

  static sortClassification(teamsArr: ILeaderboard[]) {
    return teamsArr.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;
      return 0;
    });
  }

  static getHome(teams: ITeam[] | null, finishedMatches: IMatch[]) {
    return teams?.map((t) => {
      const matches = this.matchesPlayedHome(t.id, finishedMatches);
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
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: this.calculateEfficiency(totalVictories, totalDraws, matches?.length),
      };
    });
  }

  static getAway(teams: ITeam[] | null, finishedMatches: IMatch[]) {
    return teams?.map((t) => {
      const matches = this.matchesPlayedAway(t.id, finishedMatches);
      const matchResult = this.MatchesResultsAway(matches);
      const { totalVictories, totalDraws, totalLosses } = matchResult;
      const { goalsFavor, goalsOwn } = this.calculateGoalsAway(matches);
      return {
        name: t.teamName,
        totalPoints: (totalVictories * 3) + (totalDraws * 1),
        totalGames: matches?.length,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: this.calculateEfficiency(totalVictories, totalDraws, matches?.length),
      };
    });
  }

  static async getHomeClassification() {
    const teams = await TeamService.getAll();
    const finishedMatches = await MatchService.getFinishedMatches();
    let classification;
    let sortedClassification;
    if (finishedMatches !== null) {
      classification = this.getHome(teams, finishedMatches);
    }
    if (classification !== undefined) {
      sortedClassification = this.sortClassification(classification);
    }
    return sortedClassification;
  }

  static async getAwayClassification() {
    const teams = await TeamService.getAll();
    const finishedMatches = await MatchService.getFinishedMatches();
    let classification;
    let sortedClassification;
    if (finishedMatches !== null) {
      classification = this.getAway(teams, finishedMatches);
    }
    if (classification !== undefined) {
      sortedClassification = this.sortClassification(classification);
    }
    return sortedClassification;
  }

  static combineClassifications(home: ILeaderboard[], away: ILeaderboard[]) {
    const combinedClassification = [...home];

    away.forEach((awayTeam) => {
      const eTeam = combinedClassification.find((team) => team.name === awayTeam.name);

      if (eTeam && eTeam.totalGames && awayTeam.totalGames) {
        eTeam.totalPoints += awayTeam.totalPoints;
        eTeam.totalGames += awayTeam.totalGames;
        eTeam.totalVictories += awayTeam.totalVictories;
        eTeam.totalDraws += awayTeam.totalDraws;
        eTeam.totalLosses += awayTeam.totalLosses;
        eTeam.goalsFavor += awayTeam.goalsFavor;
        eTeam.goalsOwn += awayTeam.goalsOwn;
        eTeam.goalsBalance += awayTeam.goalsBalance;
        eTeam.efficiency = ((eTeam.totalPoints / (eTeam.totalGames * 3)) * 100).toFixed(2);
      } else {
        combinedClassification.push(awayTeam);
      }
    });

    return combinedClassification;
  }

  static async getAllClassification() {
    const home = await this.getHomeClassification();
    const away = await this.getAwayClassification();
    if (home && away) {
      const combinedClassification = this.combineClassifications(home, away);
      const sortedClassification = this.sortClassification(combinedClassification);
      return sortedClassification;
    }
  }
}
