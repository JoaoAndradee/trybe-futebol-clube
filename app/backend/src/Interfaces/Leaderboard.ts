interface Leaderboard {
  name: string,
  totalPoints: number,
  totalGames: number | undefined,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string | undefined,
}

export default Leaderboard;
