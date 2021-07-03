import randomInt from "random-int";

export enum SCORE {
  MATCH = "match",
  CLOSE_MATCH = "close_match",
  PASS = "pass",
}

export type Password = number[];

export type Test = {
  valid: boolean;
  score: string[] | undefined;
};

export type Attempt = {
  solution: Password;
  test: Test;
};

export type GameConfig = {
  maxlength: number;
  selectedLength: number;
};

export type Game = {
  pw: Password;
  attempts: Attempt[];
  stage: Password;
  startTimestamp?: number;
  lastAttemptTimestamp?: number;
};

export function createGameConfig(): GameConfig {
  return {
    maxlength: 5,
    selectedLength: 3,
  };
}

export function createGame(config: GameConfig): Game {
  return {
    pw: createPassword(config.selectedLength),
    startTimestamp: undefined,
    lastAttemptTimestamp: Date.now(),
    attempts: [],
    stage: [],
  };
}

export function createPassword(len: number, values = 10): Password {
  const pw = [];

  for (let i = len; i > 0; i--) {
    pw.push(Number(randomInt(0, values - 1)));
  }

  return pw;
}

export function validate(pw: Password, solution: Password): boolean {
  if (pw == null || solution == null) return false;

  const hasCorrectLength = pw.length === solution.length;
  const hasOnlyIntegers = [...pw, ...solution].every(Number.isInteger);

  return hasCorrectLength && hasOnlyIntegers;
}

export function testSolution(pw: Password, solution: Password): Test {
  const isValid = validate(pw, solution);

  if (isValid === false) {
    return {
      valid: isValid,
      score: undefined,
    };
  }

  const score: string[] = pw.map((n) => String(n));
  const solutionClone: string[] = solution.map((n) => String(n));

  for (const i in pw) {
    const el0 = pw[i];
    const el1 = solution[i];

    if (el0 === el1) {
      score[i] = solutionClone[parseInt(i)] = SCORE.MATCH;
    }
  }

  for (const i in pw) {
    const el0 = pw[i];

    if (score[i] !== SCORE.MATCH && solutionClone.includes(String(el0))) {
      const idx = solutionClone.indexOf(String(el0));
      score[i] = solutionClone[idx] = SCORE.CLOSE_MATCH;
    }
  }

  for (const i in pw) {
    if (score[i] !== SCORE.MATCH && score[i] !== SCORE.CLOSE_MATCH) {
      score[i] = SCORE.PASS;
    }

    if (
      solutionClone[i] !== SCORE.MATCH &&
      solutionClone[i] !== SCORE.CLOSE_MATCH
    ) {
      solutionClone[i] = SCORE.PASS;
    }
  }

  return {
    valid: isValid,
    score: solutionClone,
  };
}

export function getCount(mark: string, attempt: Attempt): number {
  return attempt.test.score?.filter((el) => el === mark).length || 0;
}

export function makeAttempt(
  pw: Password,
  attempts: Attempt[],
  solution: Password
) {
  return [...attempts, { solution, test: testSolution(pw, solution) }];
}

export function hasWinningAttempt(pw: Password, attempts: Attempt[]) {
  return attempts.some(
    (attempt) => getCount(SCORE.MATCH, attempt) === pw.length
  );
}
