const teams = {
  KKR: { name: "Kolkata Knight Riders", short: "KKR", color: "linear-gradient(135deg, #4f2787, #e6c12d)", strength: 1.18, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
  GT: { name: "Gujarat Titans", short: "GT", color: "linear-gradient(135deg, #1f284d, #d5b565)", strength: 1.05, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
  DC: { name: "Delhi Capitals", short: "DC", color: "linear-gradient(135deg, #1265cb, #d7192d)", strength: 1.04, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
  PBKS: { name: "Punjab Kings", short: "PBKS", color: "linear-gradient(135deg, #de1b25, #ff9973)", strength: 0.98, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
  LSG: { name: "Lucknow Super Giants", short: "LSG", color: "linear-gradient(135deg, #0b5fff, #ff7d0d)", strength: 1, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
  RR: { name: "Rajasthan Royals", short: "RR", color: "linear-gradient(135deg, #ff2fa0, #294fe4)", strength: 1.02, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
  MI: { name: "Mumbai Indians", short: "MI", color: "linear-gradient(135deg, #0f4e8f, #ffc83d)", strength: 0.96, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
  CSK: { name: "Chennai Super Kings", short: "CSK", color: "linear-gradient(135deg, #ffd213, #005baa)", strength: 0.94, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
  SRH: { name: "Sunrisers Hyderabad", short: "SRH", color: "linear-gradient(135deg, #ff7d2d, #fdb047)", strength: 0.97, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
  RCB: { name: "Royal Challengers Bengaluru", short: "RCB", color: "linear-gradient(135deg, #d92d2d, #ffda6d)", strength: 0.9, history: [], base: { played: 0, wins: 0, losses: 0, noResult: 0, points: 0, nrr: 0, runsFor: 0, ballsFaced: 0, runsAgainst: 0, ballsBowled: 0 } },
};

const teamNameToCode = {
  "Royal Challengers Bengaluru": "RCB",
  "Royal Challengers Bangalore": "RCB",
  "Sunrisers Hyderabad": "SRH",
  "Mumbai Indians": "MI",
  "Kolkata Knight Riders": "KKR",
  "Rajasthan Royals": "RR",
  "Chennai Super Kings": "CSK",
  "Punjab Kings": "PBKS",
  "Gujarat Titans": "GT",
  "Gujrat Titans": "GT",
  "Lucknow Super Giants": "LSG",
  "Delhi Capitals": "DC",
};

function normalizeTeamKey(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

const normalizedTeamNameToCode = Object.fromEntries(
  Object.entries({
    ...teamNameToCode,
    KKR: "KKR",
    GT: "GT",
    DC: "DC",
    PBKS: "PBKS",
    LSG: "LSG",
    RR: "RR",
    MI: "MI",
    CSK: "CSK",
    SRH: "SRH",
    RCB: "RCB",
  }).map(([name, code]) => [normalizeTeamKey(name), code])
);

function resolveTeamCode(teamName) {
  const directMatch = teamNameToCode[teamName];
  if (directMatch) {
    return directMatch;
  }

  return normalizedTeamNameToCode[normalizeTeamKey(teamName)] ?? null;
}

function defaultScoreboard(home, away) {
  return {
    [home]: { runs: 174, wickets: 6, balls: 120 },
    [away]: { runs: 168, wickets: 8, balls: 120 },
  };
}

function scheduleMatch(number, date, day, start, homeName, awayName, venue) {
  const home = resolveTeamCode(homeName);
  const away = resolveTeamCode(awayName);

  if (!home || !away) {
    console.warn(`Skipping match #${number}. Unknown team name in fixture:`, { homeName, awayName });
    return null;
  }

  return {
    id: `m${number}`,
    sequence: number,
    type: "upcoming",
    headerLabel: `#${number} - ${venue} - ${date}`,
    venue,
    date,
    day,
    start,
    home,
    away,
    predicted: teams[home].strength >= teams[away].strength ? home : away,
    scoreboard: defaultScoreboard(home, away),
  };
}

const matches = [
  scheduleMatch(1, "28 Mar 2026", "Sat", "7:30 PM", "Royal Challengers Bengaluru", "Sunrisers Hyderabad", "Bengaluru"),
  scheduleMatch(2, "29 Mar 2026", "Sun", "7:30 PM", "Mumbai Indians", "Kolkata Knight Riders", "Mumbai"),
  scheduleMatch(3, "30 Mar 2026", "Mon", "7:30 PM", "Rajasthan Royals", "Chennai Super Kings", "Guwahati"),
  scheduleMatch(4, "31 Mar 2026", "Tue", "7:30 PM", "Punjab Kings", "Gujarat Titans", "New Chandigarh"),
  scheduleMatch(5, "01 Apr 2026", "Wed", "7:30 PM", "Lucknow Super Giants", "Delhi Capitals", "Lucknow"),
  scheduleMatch(6, "02 Apr 2026", "Thu", "7:30 PM", "Kolkata Knight Riders", "Sunrisers Hyderabad", "Kolkata"),
  scheduleMatch(7, "03 Apr 2026", "Fri", "7:30 PM", "Chennai Super Kings", "Punjab Kings", "Chennai"),
  scheduleMatch(8, "04 Apr 2026", "Sat", "3:30 PM", "Delhi Capitals", "Mumbai Indians", "Delhi"),
  scheduleMatch(9, "04 Apr 2026", "Sat", "7:30 PM", "Gujarat Titans", "Rajasthan Royals", "Ahmedabad"),
  scheduleMatch(10, "05 Apr 2026", "Sun", "3:30 PM", "Sunrisers Hyderabad", "Lucknow Super Giants", "Hyderabad"),
  scheduleMatch(11, "05 Apr 2026", "Sun", "7:30 PM", "Royal Challengers Bengaluru", "Chennai Super Kings", "Bengaluru"),
  scheduleMatch(12, "06 Apr 2026", "Mon", "7:30 PM", "Kolkata Knight Riders", "Punjab Kings", "Kolkata"),
  scheduleMatch(13, "07 Apr 2026", "Tue", "7:30 PM", "Rajasthan Royals", "Mumbai Indians", "Guwahati"),
  scheduleMatch(14, "08 Apr 2026", "Wed", "7:30 PM", "Delhi Capitals", "Gujarat Titans", "Delhi"),
  scheduleMatch(15, "09 Apr 2026", "Thu", "7:30 PM", "Kolkata Knight Riders", "Lucknow Super Giants", "Kolkata"),
  scheduleMatch(16, "10 Apr 2026", "Fri", "7:30 PM", "Rajasthan Royals", "Royal Challengers Bengaluru", "Guwahati"),
  scheduleMatch(17, "11 Apr 2026", "Sat", "3:30 PM", "Punjab Kings", "Sunrisers Hyderabad", "New Chandigarh"),
  scheduleMatch(18, "11 Apr 2026", "Sat", "7:30 PM", "Chennai Super Kings", "Delhi Capitals", "Chennai"),
  scheduleMatch(19, "12 Apr 2026", "Sun", "3:30 PM", "Lucknow Super Giants", "Gujarat Titans", "Lucknow"),
  scheduleMatch(20, "12 Apr 2026", "Sun", "7:30 PM", "Mumbai Indians", "Royal Challengers Bengaluru", "Mumbai"),
  scheduleMatch(21, "13 Apr 2026", "Mon", "7:30 PM", "Sunrisers Hyderabad", "Rajasthan Royals", "Hyderabad"),
  scheduleMatch(22, "14 Apr 2026", "Tue", "7:30 PM", "Chennai Super Kings", "Kolkata Knight Riders", "Chennai"),
  scheduleMatch(23, "15 Apr 2026", "Wed", "7:30 PM", "Royal Challengers Bengaluru", "Lucknow Super Giants", "Bengaluru"),
  scheduleMatch(24, "16 Apr 2026", "Thu", "7:30 PM", "Mumbai Indians", "Punjab Kings", "Mumbai"),
  scheduleMatch(25, "17 Apr 2026", "Fri", "7:30 PM", "Gujarat Titans", "Kolkata Knight Riders", "Ahmedabad"),
  scheduleMatch(26, "18 Apr 2026", "Sat", "3:30 PM", "Royal Challengers Bengaluru", "Delhi Capitals", "Bengaluru"),
  scheduleMatch(27, "18 Apr 2026", "Sat", "7:30 PM", "Sunrisers Hyderabad", "Chennai Super Kings", "Hyderabad"),
  scheduleMatch(28, "19 Apr 2026", "Sun", "3:30 PM", "Rajasthan Royals", "Punjab Kings", "Kolkata"),
  scheduleMatch(29, "19 Apr 2026", "Sun", "7:30 PM", "Punjab Kings", "Lucknow Super Giants", "New Chandigarh"),
  scheduleMatch(30, "20 Apr 2026", "Mon", "7:30 PM", "Gujarat Titans", "Mumbai Indians", "Ahmedabad"),
  scheduleMatch(31, "21 Apr 2026", "Tue", "7:30 PM", "Sunrisers Hyderabad", "Delhi Capitals", "Hyderabad"),
  scheduleMatch(32, "22 Apr 2026", "Wed", "7:30 PM", "Lucknow Super Giants", "Rajasthan Royals", "Lucknow"),
  scheduleMatch(33, "23 Apr 2026", "Thu", "7:30 PM", "Mumbai Indians", "Chennai Super Kings", "Mumbai"),
  scheduleMatch(34, "24 Apr 2026", "Fri", "7:30 PM", "Royal Challengers Bengaluru", "Gujarat Titans", "Bengaluru"),
  scheduleMatch(35, "25 Apr 2026", "Sat", "3:30 PM", "Delhi Capitals", "Punjab Kings", "Delhi"),
  scheduleMatch(36, "25 Apr 2026", "Sat", "7:30 PM", "Rajasthan Royals", "Sunrisers Hyderabad", "Jaipur"),
  scheduleMatch(37, "26 Apr 2026", "Sun", "3:30 PM", "Rajasthan Royals", "Chennai Super Kings", "Ahmedabad"),
  scheduleMatch(38, "26 Apr 2026", "Sun", "7:30 PM", "Lucknow Super Giants", "Kolkata Knight Riders", "Lucknow"),
  scheduleMatch(39, "27 Apr 2026", "Mon", "7:30 PM", "Delhi Capitals", "Royal Challengers Bengaluru", "Delhi"),
  scheduleMatch(40, "28 Apr 2026", "Tue", "7:30 PM", "Punjab Kings", "Rajasthan Royals", "New Chandigarh"),
  scheduleMatch(41, "29 Apr 2026", "Wed", "7:30 PM", "Mumbai Indians", "Sunrisers Hyderabad", "Mumbai"),
  scheduleMatch(42, "30 Apr 2026", "Thu", "7:30 PM", "Gujarat Titans", "Royal Challengers Bengaluru", "Ahmedabad"),
  scheduleMatch(43, "01 May 2026", "Fri", "7:30 PM", "Rajasthan Royals", "Delhi Capitals", "Jaipur"),
  scheduleMatch(44, "02 May 2026", "Sat", "7:30 PM", "Chennai Super Kings", "Mumbai Indians", "Chennai"),
  scheduleMatch(45, "03 May 2026", "Sun", "3:30 PM", "Sunrisers Hyderabad", "Kolkata Knight Riders", "Hyderabad"),
  scheduleMatch(46, "03 May 2026", "Sun", "7:30 PM", "Gujarat Titans", "Punjab Kings", "Ahmedabad"),
  scheduleMatch(47, "04 May 2026", "Mon", "7:30 PM", "Mumbai Indians", "Lucknow Super Giants", "Mumbai"),
  scheduleMatch(48, "05 May 2026", "Tue", "7:30 PM", "Delhi Capitals", "Chennai Super Kings", "Delhi"),
  scheduleMatch(49, "06 May 2026", "Wed", "7:30 PM", "Sunrisers Hyderabad", "Punjab Kings", "Hyderabad"),
  scheduleMatch(50, "07 May 2026", "Thu", "7:30 PM", "Lucknow Super Giants", "Royal Challengers Bengaluru", "Lucknow"),
  scheduleMatch(51, "08 May 2026", "Fri", "7:30 PM", "Delhi Capitals", "Kolkata Knight Riders", "Delhi"),
  scheduleMatch(52, "09 May 2026", "Sat", "7:30 PM", "Rajasthan Royals", "Gujarat Titans", "Jaipur"),
  scheduleMatch(53, "10 May 2026", "Sun", "3:30 PM", "Chennai Super Kings", "Lucknow Super Giants", "Chennai"),
  scheduleMatch(54, "10 May 2026", "Sun", "7:30 PM", "Royal Challengers Bengaluru", "Mumbai Indians", "Raipur"),
  scheduleMatch(55, "11 May 2026", "Mon", "7:00 PM", "Punjab Kings", "Delhi Capitals", "Dharamshala"),
  scheduleMatch(56, "12 May 2026", "Tue", "7:30 PM", "Gujarat Titans", "Sunrisers Hyderabad", "Ahmedabad"),
  scheduleMatch(57, "13 May 2026", "Wed", "7:30 PM", "Royal Challengers Bengaluru", "Kolkata Knight Riders", "Raipur"),
  scheduleMatch(58, "14 May 2026", "Thu", "7:30 PM", "Punjab Kings", "Mumbai Indians", "Dharamshala"),
  scheduleMatch(59, "15 May 2026", "Fri", "7:30 PM", "Lucknow Super Giants", "Chennai Super Kings", "Lucknow"),
  scheduleMatch(60, "16 May 2026", "Sat", "7:30 PM", "Kolkata Knight Riders", "Gujarat Titans", "Kolkata"),
  scheduleMatch(61, "17 May 2026", "Sun", "3:30 PM", "Punjab Kings", "Royal Challengers Bengaluru", "Dharamshala"),
  scheduleMatch(62, "17 May 2026", "Sun", "7:30 PM", "Delhi Capitals", "Rajasthan Royals", "Delhi"),
  scheduleMatch(63, "18 May 2026", "Mon", "7:30 PM", "Chennai Super Kings", "Sunrisers Hyderabad", "Chennai"),
  scheduleMatch(64, "19 May 2026", "Tue", "7:30 PM", "Rajasthan Royals", "Lucknow Super Giants", "Jaipur"),
  scheduleMatch(65, "20 May 2026", "Wed", "7:30 PM", "Kolkata Knight Riders", "Mumbai Indians", "Kolkata"),
  scheduleMatch(66, "21 May 2026", "Thu", "7:30 PM", "Chennai Super Kings", "Gujarat Titans", "Chennai"),
  scheduleMatch(67, "22 May 2026", "Fri", "7:30 PM", "Sunrisers Hyderabad", "Royal Challengers Bengaluru", "Hyderabad"),
  scheduleMatch(68, "23 May 2026", "Sat", "7:30 PM", "Lucknow Super Giants", "Punjab Kings", "Lucknow"),
  scheduleMatch(69, "24 May 2026", "Sun", "3:30 PM", "Mumbai Indians", "Rajasthan Royals", "Mumbai"),
  scheduleMatch(70, "24 May 2026", "Sun", "7:30 PM", "Kolkata Knight Riders", "Delhi Capitals", "Kolkata"),
].filter(Boolean);

function cloneBaseTable() {
  return Object.fromEntries(Object.entries(teams).map(([code, profile]) => [code, { ...profile.base }]));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function ballsToOvers(totalBalls) {
  const overs = totalBalls / 6;
  return overs.toFixed(2).replace(/\.00$/, ".0").replace(/(\.\d)0$/, "$1");
}

function oversToFloat(totalBalls) {
  return totalBalls > 0 ? totalBalls / 6 : 20;
}

function oversStringToBalls(value) {
  const text = String(value ?? "").trim();
  if (!text) {
    return 0;
  }

  const [oversPartRaw, fractionRaw = "0"] = text.split(".");
  const oversPart = clamp(Number(oversPartRaw) || 0, 0, 20);

  if (!fractionRaw) {
    return clamp(oversPart * 6, 0, 120);
  }

  if (fractionRaw.length === 1 && Number(fractionRaw) <= 5) {
    return clamp(oversPart * 6 + Number(fractionRaw), 0, 120);
  }

  const decimalOvers = Number(text);
  if (Number.isNaN(decimalOvers)) {
    return 0;
  }

  const fraction = decimalOvers - Math.floor(decimalOvers);
  const ballsPart = clamp(Math.round(fraction * 6), 0, 5);
  return clamp(oversPart * 6 + ballsPart, 0, 120);
}

function scoreString(value, wickets) {
  return `${value}/${wickets}`;
}

function parseScoreString(rawValue) {
  const text = String(rawValue ?? "").trim();
  if (!text) {
    return { runs: 0, wickets: 0 };
  }

  const [runsPart = "0", wicketsPart = "0"] = text.split("/");
  return {
    runs: clamp(Number(runsPart) || 0, 0, 300),
    wickets: clamp(Number(wicketsPart) || 0, 0, 10),
  };
}

function normalizeTeamScore(rawTeamScore, fallbackScore) {
  if (!rawTeamScore) {
    return { ...fallbackScore };
  }

  if (typeof rawTeamScore.score === "string") {
    const parsedScore = parseScoreString(rawTeamScore.score);
    return {
      runs: parsedScore.runs,
      wickets: parsedScore.wickets,
      balls:
        rawTeamScore.overs !== undefined
          ? oversStringToBalls(rawTeamScore.overs)
          : clamp(Number(rawTeamScore.balls) || fallbackScore.balls, 0, 120),
    };
  }

  return {
    runs: clamp(Number(rawTeamScore.runs) || 0, 0, 300),
    wickets: clamp(Number(rawTeamScore.wickets) || 0, 0, 10),
    balls:
      rawTeamScore.overs !== undefined
        ? oversStringToBalls(rawTeamScore.overs)
        : clamp(Number(rawTeamScore.balls) || fallbackScore.balls, 0, 120),
  };
}

function applyExternalResults() {
  const resultMap = window.MATCH_RESULTS ?? {};

  matches.forEach((match) => {
    const savedResult = resultMap[match.id];
    if (!savedResult) {
      return;
    }

    const scoreboard = {
      [match.home]: normalizeTeamScore(savedResult.scoreboard?.[match.home], match.scoreboard[match.home]),
      [match.away]: normalizeTeamScore(savedResult.scoreboard?.[match.away], match.scoreboard[match.away]),
    };

    match.scoreboard = scoreboard;
    match.type = "completed";
    match.completedWinner = savedResult.completedWinner ?? scoreWinner(match, scoreboard);
    match.predicted = match.completedWinner;
  });
}

applyExternalResults();

const upcomingMatches = matches.filter((match) => match.type === "upcoming");

const state = {
  filter: "upcoming",
  theme: "dark",
  section: "league",
  selections: Object.fromEntries(upcomingMatches.map((match) => [match.id, null])),
  expandedScores: Object.fromEntries(matches.map((match) => [match.id, false])),
  scores: Object.fromEntries(matches.map((match) => [match.id, { [match.home]: { ...match.scoreboard[match.home] }, [match.away]: { ...match.scoreboard[match.away] } }])),
};

const matchesGrid = document.getElementById("matchesGrid");
const standingsBody = document.getElementById("standingsBody");
const oddsList = document.getElementById("oddsList");
const oddsSummary = document.getElementById("oddsSummary");
const predictionStatus = document.getElementById("predictionStatus");
const topPredictionStatus = document.getElementById("topPredictionStatus");
const matchCardTemplate = document.getElementById("matchCardTemplate");
const themeToggle = document.getElementById("themeToggle");
const installButton = document.getElementById("installButton");
let liveOddsCache = null;
let liveOddsCacheKey = "";
let deferredInstallPrompt = null;

function invalidateSimulationCache() {
  liveOddsCache = null;
  liveOddsCacheKey = "";
}

function scoreWinner(match, override = state.scores[match.id]) {
  const homeRuns = override[match.home].runs;
  const awayRuns = override[match.away].runs;
  if (homeRuns === awayRuns) {
    return "NR";
  }
  return homeRuns > awayRuns ? match.home : match.away;
}

function getOutcome(match, selectionMap = state.selections) {
  if (match.type === "completed") {
    return match.completedWinner ?? scoreWinner(match);
  }
  return selectionMap[match.id];
}

function getRecentForm(teamCode, beforeSequence, selectionMap = state.selections) {
  const results = [...teams[teamCode].history];

  matches
    .filter((match) => match.sequence < beforeSequence)
    .sort((left, right) => left.sequence - right.sequence)
    .forEach((match) => {
      if (match.home !== teamCode && match.away !== teamCode) {
        return;
      }
      const outcome = getOutcome(match, selectionMap);
      if (!outcome) {
        return;
      }
      if (outcome === "NR") {
        results.push("NR");
      } else {
        results.push(outcome === teamCode ? "W" : "L");
      }
    });

  return results.slice(-5);
}

function renderFormChips(form) {
  if (!form.length) {
    return '<span class="form-chip form-chip--empty">-</span><span class="form-chip form-chip--empty">-</span><span class="form-chip form-chip--empty">-</span>';
  }
  return form.map((result) => `<span class="form-chip result-${result.toLowerCase()}">${result}</span>`).join("");
}

function formScore(form) {
  const weights = [0.5, 0.7, 0.9, 1.1, 1.3];
  return form.reduce((sum, result, index) => {
    const value = result === "W" ? 1 : result === "L" ? -1 : 0.18;
    return sum + value * weights[index];
  }, 0);
}

function effectiveBallsForNRR(score) {
  if (score.wickets >= 10 && score.balls < 120) {
    return 120;
  }
  return clamp(score.balls, 0, 120);
}

function applyOutcome(table, match, outcome, scoreState = state.scores[match.id]) {
  const home = table[match.home];
  const away = table[match.away];
  const homeScore = scoreState[match.home];
  const awayScore = scoreState[match.away];
  const homeFacedBalls = effectiveBallsForNRR(homeScore);
  const awayFacedBalls = effectiveBallsForNRR(awayScore);

  home.played += 1;
  away.played += 1;
  home.runsFor += homeScore.runs;
  home.ballsFaced += homeFacedBalls;
  home.runsAgainst += awayScore.runs;
  home.ballsBowled += awayFacedBalls;
  away.runsFor += awayScore.runs;
  away.ballsFaced += awayFacedBalls;
  away.runsAgainst += homeScore.runs;
  away.ballsBowled += homeFacedBalls;

  if (outcome === "NR") {
    home.noResult += 1;
    away.noResult += 1;
    home.points += 1;
    away.points += 1;
    home.nrr = home.ballsFaced && home.ballsBowled ? home.runsFor / oversToFloat(home.ballsFaced) - home.runsAgainst / oversToFloat(home.ballsBowled) : 0;
    away.nrr = away.ballsFaced && away.ballsBowled ? away.runsFor / oversToFloat(away.ballsFaced) - away.runsAgainst / oversToFloat(away.ballsBowled) : 0;
    return;
  }

  if (outcome === match.home) {
    home.wins += 1;
    home.points += 2;
    away.losses += 1;
  } else {
    away.wins += 1;
    away.points += 2;
    home.losses += 1;
  }

  home.nrr = home.ballsFaced && home.ballsBowled ? home.runsFor / oversToFloat(home.ballsFaced) - home.runsAgainst / oversToFloat(home.ballsBowled) : 0;
  away.nrr = away.ballsFaced && away.ballsBowled ? away.runsFor / oversToFloat(away.ballsFaced) - away.runsAgainst / oversToFloat(away.ballsBowled) : 0;
}

function buildTableFromOutcomes(selectionMap = state.selections, throughSequence = Number.POSITIVE_INFINITY) {
  const table = cloneBaseTable();

  matches
    .filter((match) => match.sequence <= throughSequence)
    .sort((left, right) => left.sequence - right.sequence)
    .forEach((match) => {
      const outcome = getOutcome(match, selectionMap);
      if (outcome) {
        applyOutcome(table, match, outcome, state.scores[match.id]);
      }
    });

  return table;
}

function rankTable(table) {
  return Object.entries(table)
    .map(([code, values]) => ({ code, ...values, nrr: Number(values.nrr.toFixed(3)) }))
    .sort((left, right) => (right.points !== left.points ? right.points - left.points : right.nrr - left.nrr));
}

function buildProjection(selectionMap = state.selections) {
  return rankTable(buildTableFromOutcomes(selectionMap));
}

function getWinProbabilities(match) {
  const tableBefore = buildTableFromOutcomes(state.selections, match.sequence - 1);
  const homeForm = getRecentForm(match.home, match.sequence);
  const awayForm = getRecentForm(match.away, match.sequence);
  const rankedBefore = rankTable(tableBefore);
  const homeRank = rankedBefore.findIndex((entry) => entry.code === match.home) + 1;
  const awayRank = rankedBefore.findIndex((entry) => entry.code === match.away) + 1;

  const homePlayed = tableBefore[match.home].played;
  const awayPlayed = tableBefore[match.away].played;
  const matchesPlayedAverage = (homePlayed + awayPlayed) / 2;
  const strengthWeight = Math.max(0.04, 0.18 - matchesPlayedAverage * 0.02);

  const homePointsPerMatch = homePlayed ? tableBefore[match.home].points / homePlayed : 0;
  const awayPointsPerMatch = awayPlayed ? tableBefore[match.away].points / awayPlayed : 0;

  const strengthEdge = (teams[match.home].strength - teams[match.away].strength) * strengthWeight;
  const pointsEdge = (homePointsPerMatch - awayPointsPerMatch) * 0.14;
  const rankEdge = (awayRank - homeRank) * 0.028;
  const nrrEdge = (tableBefore[match.home].nrr - tableBefore[match.away].nrr) * 0.04;
  const formEdge = (formScore(homeForm) - formScore(awayForm)) * 0.045;
  const homeProbability = clamp(0.5 + strengthEdge + pointsEdge + rankEdge + nrrEdge + formEdge + 0.035, 0.24, 0.76);

  return {
    home: Number((homeProbability * 100).toFixed(0)),
    away: Number(((1 - homeProbability) * 100).toFixed(0)),
    impact:
      Math.abs(homeRank - awayRank) <= 2
        ? "Massive top-four swing"
        : Math.abs(homePointsPerMatch - awayPointsPerMatch) >= 0.5
          ? "Form and table edge matter here"
          : "Useful NRR leverage",
  };
}

function simulatePlayoffOdds(selectionMap = state.selections) {
  const unresolved = upcomingMatches.filter((match) => !selectionMap[match.id]);
  const teamCodes = Object.keys(teams);
  const counts = Object.fromEntries(teamCodes.map((code) => [code, { top4: 0, top2: 0, reach14: 0, minWins: Number.POSITIVE_INFINITY, avgRank: 0 }]));
  const iterations = unresolved.length <= 10 ? 4000 : 2000;
  const currentTable = buildTableFromOutcomes(selectionMap);
  let totalScenarios = 0;

  for (let index = 0; index < iterations; index += 1) {
    const sampledSelections = { ...selectionMap };
    const sampledWins = {};

    unresolved.forEach((match) => {
      const probabilities = getWinProbabilities(match);
      const random = Math.random() * 100;
      const noResultChance = 4;
      let outcome = match.home;

      if (random < probabilities.home - noResultChance / 2) {
        outcome = match.home;
      } else if (random > 100 - probabilities.away + noResultChance / 2) {
        outcome = match.away;
      } else {
        outcome = "NR";
      }

      sampledSelections[match.id] = outcome;
      if (outcome !== "NR") {
        sampledWins[outcome] = (sampledWins[outcome] ?? 0) + 1;
      }
    });

    const projection = buildProjection(sampledSelections);
    totalScenarios += 1;

    projection.forEach((entry, rankIndex) => {
      const bucket = counts[entry.code];
      bucket.avgRank += rankIndex + 1;
      if (entry.points >= 14) {
        bucket.reach14 += 1;
      }
      if (rankIndex < 4) {
        bucket.top4 += 1;
        bucket.minWins = Math.min(bucket.minWins, sampledWins[entry.code] ?? 0);
      }
      if (rankIndex < 2) {
        bucket.top2 += 1;
      }
    });
  }

  return teamCodes
    .map((code) => {
      const bucket = counts[code];
      const played = currentTable[code].played;
      const progressFactor = clamp(0.22 + (played / 14) * 0.78, 0.22, 1);
      const rawTop4 = totalScenarios ? (bucket.top4 / totalScenarios) * 100 : 0;
      const rawTop2 = totalScenarios ? (bucket.top2 / totalScenarios) * 100 : 0;
      const reach14 = totalScenarios ? (bucket.reach14 / totalScenarios) * 100 : 0;
      const blendedTop4 = rawTop4 * 0.55 + reach14 * 0.45;
      return {
        code,
        top4: Number((40 + (blendedTop4 - 40) * progressFactor).toFixed(1)),
        top2: Number((20 + (rawTop2 - 20) * progressFactor).toFixed(1)),
        reach14: Number(reach14.toFixed(1)),
        avgRank: totalScenarios ? Number((bucket.avgRank / totalScenarios).toFixed(2)) : 10,
        minWins: Number.isFinite(bucket.minWins) ? bucket.minWins : null,
      };
    })
    .sort((left, right) => right.top4 - left.top4);
}

const currentRankings = rankTable(buildTableFromOutcomes({}));
const baselineOdds = simulatePlayoffOdds({});

function getSimulationKey() {
  return JSON.stringify({ selections: state.selections, scores: state.scores });
}

function getLiveOdds() {
  const key = getSimulationKey();
  if (liveOddsCache && liveOddsCacheKey === key) {
    return liveOddsCache;
  }
  liveOddsCache = simulatePlayoffOdds();
  liveOddsCacheKey = key;
  return liveOddsCache;
}

function renderStandings() {
  const standings = buildProjection();
  const liveOdds = getLiveOdds();
  const cutoffPoints = standings[Math.min(3, standings.length - 1)].points;
  const oddsMap = Object.fromEntries(liveOdds.map((entry) => [entry.code, entry]));
  const pickedCount = Object.values(state.selections).filter(Boolean).length;

  standingsBody.innerHTML = standings
    .map((entry, index) => {
      const baselineRank = currentRankings.findIndex((item) => item.code === entry.code) + 1;
      const rankDelta = baselineRank - (index + 1);
      const status =
        pickedCount === 0
          ? { label: "-", className: "hunt" }
          : index < 4
            ? { label: "Q", className: "qual" }
            : { label: cutoffPoints - entry.points <= 2 ? "H" : "H", className: "hunt" };
      const oddsDelta = oddsMap[entry.code].top4 - baselineOdds.find((item) => item.code === entry.code).top4;
      return `
        <tr class="${index < 4 ? "is-qualified" : ""}">
          <td>${index + 1}</td>
          <td>
            <div class="team-cell">
              <span class="team-badge" style="background:${teams[entry.code].color}"></span>
              <strong>${entry.code}</strong>
              <span class="status-chip ${status.className}">${status.label}</span>
              <span class="table-delta ${oddsDelta >= 0 ? "positive" : "negative"}">${oddsDelta >= 0 ? "▲" : "▼"}${Math.abs(oddsDelta).toFixed(1)}%</span>
            </div>
          </td>
          <td>${entry.played}</td>
          <td>${entry.wins}</td>
          <td>${entry.losses}</td>
          <td>${entry.noResult}</td>
          <td><strong>${entry.points}</strong></td>
          <td>${entry.nrr >= 0 ? "+" : ""}${entry.nrr.toFixed(3)}</td>
        </tr>
      `;
    })
    .join("");
}

function buildOddsNote(entry, standingsMap) {
  const pickedCount = Object.values(state.selections).filter(Boolean).length;
  const currentPoints = standingsMap[entry.code].points;
  const currentPlayed = standingsMap[entry.code].played;
  const remainingGames = Math.max(0, 14 - currentPlayed);
  const winsToThreshold = Math.max(0, Math.ceil((14 - currentPoints) / 2));
  let nrrText = "NRR could break tied scenarios.";
  if (entry.top4 >= 70) {
    nrrText = "Current NRR cushion is already doing useful work.";
  } else if (entry.top4 <= 25) {
    nrrText = "Will likely need wins plus a visible NRR swing.";
  }

  return {
    winsText: `${winsToThreshold} of ${remainingGames} wins needed for 14 points`,
    nrrText,
    summary:
      pickedCount === 0
        ? `${teams[entry.code].name} start level on points before the season begins.`
        : standingsMap[entry.code].rank <= 4
          ? `${teams[entry.code].name} are currently in a qualifying slot.`
          : `${teams[entry.code].name} are chasing the current top-four cut line.`,
  };
}

function renderOdds() {
  const liveOdds = getLiveOdds();
  const pickedMatches = Object.values(state.selections).filter(Boolean).length;
  const standings = buildProjection();
  const standingsMap = Object.fromEntries(standings.map((entry, index) => [entry.code, { ...entry, rank: index + 1 }]));

  oddsSummary.textContent =
    pickedMatches === upcomingMatches.length
      ? "Every remaining match has a prediction. These cards now show the locked projection after your picks."
      : `${pickedMatches}/${upcomingMatches.length} matches predicted. Cards update live using every unresolved result combination.`;

  oddsList.innerHTML = liveOdds
    .map((entry) => {
      const baseline = baselineOdds.find((item) => item.code === entry.code);
      const delta = entry.top4 - baseline.top4;
      const note = buildOddsNote(entry, standingsMap);

      return `
        <article class="odds-card-item">
          <div class="odds-card-item__head">
            <div class="odds-card-item__title">
              <span class="team-badge" style="background:${teams[entry.code].color}"></span>
              <span>${teams[entry.code].name}</span>
            </div>
          </div>
          <div class="metric-stack">
            <div class="metric-label">
              <span>Top 4</span>
              <div><span class="metric-value">${entry.top4}%</span> <span class="metric-delta ${delta >= 0 ? "positive" : "negative"}">${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%</span></div>
            </div>
            <div class="metric-track"><span class="metric-fill" style="width:${entry.top4}%; background:${teams[entry.code].color}"></span></div>
          </div>
          <div class="metric-stack">
            <div class="metric-label">
              <span>Top 2</span>
              <span class="metric-value">${entry.top2}%</span>
            </div>
            <div class="metric-track"><span class="metric-fill" style="width:${entry.top2}%; background:linear-gradient(135deg, #facc15, #f59e0b)"></span></div>
          </div>
          <div class="metric-note">
            <p><strong>Need wins</strong> ${note.winsText}</p>
            <p><strong>NRR boost</strong> ${note.nrrText}</p>
            <p class="metric-subtext">${note.summary}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function getScoreSummary(match) {
  const scoreState = state.scores[match.id];
  const home = scoreState[match.home];
  const away = scoreState[match.away];
  const selectedWinner = getOutcome(match);
  const scoreWinnerTeam = scoreWinner(match, scoreState);
  const winner = selectedWinner || scoreWinnerTeam;
  const winnerScore = winner === match.home ? home : away;
  const loserScore = winner === match.home ? away : home;
  if (winner === "NR") {
    return "Projected no result. Teams split the points.";
  }
  if (selectedWinner && selectedWinner !== "NR" && selectedWinner !== scoreWinnerTeam) {
    return `Selected result favors ${teams[selectedWinner].name}. Adjust the scoreline if you want NRR to match that pick.`;
  }

  if (winnerScore.runs > loserScore.runs && winnerScore.wickets < 10 && winnerScore.balls < 120) {
    const wicketsInHand = 10 - winnerScore.wickets;
    const ballsRemaining = 120 - winnerScore.balls;
    return `${teams[winner].name} would win by ${wicketsInHand} wickets with ${ballsRemaining} balls to spare.`;
  }

  return `${teams[winner].name} would win by ${Math.abs(home.runs - away.runs)} runs with this scoreline.`;
}

function renderScoreSummary(match, container) {
  const scoreState = state.scores[match.id];
  const home = scoreState[match.home];
  const away = scoreState[match.away];
  container.innerHTML = `
    <div class="score-summary__headline">
      <div class="score-summary__team">
        <strong>${match.home}</strong>
        <span class="score-summary__line">${home.runs}/${home.wickets}</span>
        <span class="score-summary__overs">${ballsToOvers(home.balls)} overs</span>
      </div>
      <div class="versus">vs</div>
      <div class="score-summary__team score-summary__team--right">
        <strong>${match.away}</strong>
        <span class="score-summary__line">${away.runs}/${away.wickets}</span>
        <span class="score-summary__overs">${ballsToOvers(away.balls)} overs</span>
      </div>
    </div>
    <p class="score-summary__result">${getScoreSummary(match)}</p>
  `;
}

function renderScoreControls(match, container, teamCode) {
  const score = state.scores[match.id][teamCode];
  const isLocked = match.type === "completed";
  const controlMarkup = [
    ["score", "Score", scoreString(score.runs, score.wickets), "text", "150/7", "score-control--wide"],
    ["overs", "Overs", ballsToOvers(score.balls), "text", "18.3", "score-control--overs"],
  ]
    .map(([field, label, value, inputMode, placeholder, extraClass]) => `
      <div class="score-control ${extraClass}">
        <label>${label}</label>
        <input class="score-input" data-match-id="${match.id}" data-team="${teamCode}" data-field="${field}" type="${inputMode}" value="${value}" placeholder="${placeholder}" ${isLocked ? "disabled" : ""} />
      </div>
    `)
    .join("");

  container.innerHTML = `
    <div class="score-team-title">
      <span>${teams[teamCode].short} Score</span>
      <span class="score-helper">${score.runs}/${score.wickets} in ${ballsToOvers(score.balls)}</span>
    </div>
    <div class="score-control-grid">${controlMarkup}</div>
  `;
}

function updateScoreField(matchId, teamCode, field, rawValue) {
  const match = matches.find((item) => item.id === matchId);
  if (match?.type === "completed") {
    return;
  }

  const score = state.scores[matchId][teamCode];
  if (field === "score") {
    const parsed = parseScoreString(rawValue);
    score.runs = parsed.runs;
    score.wickets = parsed.wickets;
  }
  if (field === "overs") score.balls = oversStringToBalls(rawValue);
  invalidateSimulationCache();
  renderAll();
}

function attachScoreInputHandlers(scope) {
  scope.querySelectorAll(".score-input").forEach((input) => {
    input.addEventListener("change", () => {
      updateScoreField(input.dataset.matchId, input.dataset.team, input.dataset.field, input.value);
    });
  });
}

function renderMatches() {
  const visibleMatches = matches.filter((match) => (state.filter === "all" ? true : match.type === state.filter));
  visibleMatches.sort((left, right) => {
    if (state.filter === "completed") return right.sequence - left.sequence;
    if (state.filter === "all") return left.type === right.type ? left.sequence - right.sequence : left.type === "upcoming" ? -1 : 1;
    return left.sequence - right.sequence;
  });

  matchesGrid.innerHTML = "";

  visibleMatches.forEach((match) => {
    const fragment = matchCardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".match-card");
    const headerMeta = fragment.querySelector(".match-meta");
    const statePill = fragment.querySelector(".state-pill");
    const teamNames = fragment.querySelectorAll(".team-name");
    const teamShorts = fragment.querySelectorAll(".team-short");
    const teamIcons = fragment.querySelectorAll(".team-icon");
    const predictionButtons = fragment.querySelector(".prediction-buttons");
    const formLeft = fragment.querySelector(".form-chips--left");
    const formRight = fragment.querySelector(".form-chips--right");
    const probabilityLeft = fragment.querySelector(".probability-value--left");
    const probabilityRight = fragment.querySelector(".probability-value--right");
    const probabilityBar = fragment.querySelector(".probability-bar");
    const probabilityHome = fragment.querySelector(".probability-bar__home");
    const probabilityAway = fragment.querySelector(".probability-bar__away");
    const impactCopy = fragment.querySelector(".impact-copy");
    const scoreToggle = fragment.querySelector(".score-toggle");
    const scorePanel = fragment.querySelector(".score-panel");
    const scoreSummary = fragment.querySelector(".score-summary");
    const scoreColumns = fragment.querySelectorAll(".score-team-column");
    const probability = getWinProbabilities(match);

    card.classList.toggle("is-completed", match.type === "completed");
    headerMeta.textContent = match.headerLabel;
    statePill.textContent = match.type;
    statePill.classList.toggle("is-live", match.type === "upcoming");

    teamNames[0].textContent = teams[match.home].name;
    teamNames[1].textContent = teams[match.away].name;
    teamShorts[0].textContent = teams[match.home].short;
    teamShorts[1].textContent = teams[match.away].short;
    teamIcons[0].style.background = teams[match.home].color;
    teamIcons[1].style.background = teams[match.away].color;

    formLeft.innerHTML = renderFormChips(getRecentForm(match.home, match.sequence));
    formRight.innerHTML = renderFormChips(getRecentForm(match.away, match.sequence));

    probabilityLeft.textContent = `${probability.home}%`;
    probabilityRight.textContent = `${probability.away}%`;
    probabilityBar.style.setProperty("--home-probability", `${probability.home}%`);
    probabilityHome.style.background = teams[match.home].color;
    probabilityAway.style.background = teams[match.away].color;
    impactCopy.textContent = probability.impact;

    if (match.type === "completed") {
      predictionButtons.innerHTML = `<button class="prediction-button is-selected" type="button" style="background:${teams[match.completedWinner].color}">${match.completedWinner} won</button>`;
    } else {
      [match.home, "NR", match.away].forEach((option) => {
        const button = document.createElement("button");
        const isSelected = state.selections[match.id] === option;
        button.type = "button";
        button.className = `prediction-button${isSelected ? " is-selected" : ""}`;
        button.textContent = option === "NR" ? "No Result" : option;
        if (isSelected) {
          button.style.background = option === "NR" ? "linear-gradient(135deg, #4c4c4c, #666666)" : teams[option].color;
        }
        button.addEventListener("click", () => {
          state.selections[match.id] = state.selections[match.id] === option ? null : option;
          invalidateSimulationCache();
          renderAll();
        });
        predictionButtons.appendChild(button);
      });
    }

    if (match.type === "completed") {
      scoreToggle.textContent = "Official Scorecard";
      scoreToggle.disabled = true;
      scorePanel.classList.remove("hidden");
    } else {
      scoreToggle.textContent = state.expandedScores[match.id] ? "Hide Scores" : "Set Scores (For NRR)";
      scoreToggle.addEventListener("click", () => {
        state.expandedScores[match.id] = !state.expandedScores[match.id];
        renderAll();
      });
      scorePanel.classList.toggle("hidden", !state.expandedScores[match.id]);
    }

    renderScoreSummary(match, scoreSummary);
    renderScoreControls(match, scoreColumns[0], match.home);
    renderScoreControls(match, scoreColumns[1], match.away);
    attachScoreInputHandlers(fragment);
    matchesGrid.appendChild(fragment);
  });
}

function updateStatus() {
  const total = upcomingMatches.length;
  const picked = Object.values(state.selections).filter(Boolean).length;
  const message = picked === total ? "Every remaining fixture is predicted. Live odds now reflect your full scenario." : `${picked} of ${total} upcoming matches predicted. Unpicked fixtures stay live inside the playoff simulation.`;
  predictionStatus.textContent = message;
  topPredictionStatus.textContent = `${picked}/${total} matches predicted`;
}

function renderTheme() {
  document.body.dataset.theme = state.theme;
  themeToggle.innerHTML = `<span class="theme-toggle__icon" aria-hidden="true">${state.theme === "dark" ? "&#9728;" : "&#9790;"}</span>`;
}

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function renderInstallButton() {
  if (!installButton) {
    return;
  }
  const shouldShow = Boolean(deferredInstallPrompt) && !isStandaloneMode();
  installButton.classList.toggle("hidden", !shouldShow);
}

function renderSectionView() {
  document.body.dataset.section = state.section;
  document.querySelectorAll(".stage-tab").forEach((button) => {
    button.classList.toggle("stage-tab--active", button.dataset.view === state.section);
  });
}

function renderAll() {
  renderTheme();
  renderSectionView();
  renderInstallButton();
  renderMatches();
  renderStandings();
  renderOdds();
  updateStatus();
  document.querySelectorAll(".segment").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === state.filter);
  });
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    renderAll();
  });
});

document.querySelectorAll(".stage-tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.section = button.dataset.view;
    renderAll();
  });
});

document.getElementById("simulateButton").addEventListener("click", () => {
  upcomingMatches.forEach((match) => {
    const probabilities = getWinProbabilities(match);
    const random = Math.random() * 100;
    if (random < probabilities.home - 2) {
      state.selections[match.id] = match.home;
    } else if (random > 100 - probabilities.away + 2) {
      state.selections[match.id] = match.away;
    } else {
      state.selections[match.id] = "NR";
    }
  });
  invalidateSimulationCache();
  renderAll();
});

document.getElementById("resetButton").addEventListener("click", () => {
  upcomingMatches.forEach((match) => {
    state.selections[match.id] = null;
    state.expandedScores[match.id] = false;
  });
  invalidateSimulationCache();
  renderAll();
});

themeToggle.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  renderAll();
});

document.getElementById("runSimulationButton").addEventListener("click", () => {
  predictionStatus.textContent = "Advanced simulation refreshed from the current picks and score inputs.";
  invalidateSimulationCache();
  renderAll();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  renderInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  renderInstallButton();
});

if (installButton) {
  installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      return;
    }

    deferredInstallPrompt.prompt();
    try {
      await deferredInstallPrompt.userChoice;
    } catch (_) {
      // ignore
    }
    deferredInstallPrompt = null;
    renderInstallButton();
  });
}

renderAll();
