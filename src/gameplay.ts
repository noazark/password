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

export type Game = {
  password: Password;
  attempts: Attempt[];
  stage: Password;
};

export function createGame(passwordLength: number): Game {
  return {
    password: createPassword(passwordLength),
    attempts: [],
    stage: [],
  };
}

export function createPassword(passwordLength: number, values = 10): Password {
  const password = [];

  for (let i = passwordLength; i > 0; i--) {
    password.push(Number(randomInt(0, values - 1)));
  }

  return password;
}

export function validate(password: Password, solution: Password): boolean {
  if (password == null || solution == null) return false;

  const hasCorrectLength = password.length === solution.length;
  const hasOnlyIntegers = [...password, ...solution].every(Number.isInteger);

  return hasCorrectLength && hasOnlyIntegers;
}

export function testSolution(password: Password, solution: Password): Test {
  const isValid = validate(password, solution);

  if (isValid === false) {
    return {
      valid: isValid,
      score: undefined,
    };
  }

  const score: string[] = password.map((n) => String(n));
  const solutionClone: string[] = solution.map((n) => String(n));

  for (const i in password) {
    const el0 = password[i];
    const el1 = solution[i];

    if (el0 === el1) {
      score[i] = solutionClone[parseInt(i)] = SCORE.MATCH;
    }
  }

  for (const i in password) {
    const el0 = password[i];

    if (score[i] !== SCORE.MATCH && solutionClone.includes(String(el0))) {
      const idx = solutionClone.indexOf(String(el0));
      score[i] = solutionClone[idx] = SCORE.CLOSE_MATCH;
    }
  }

  for (const i in password) {
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
  password: Password,
  attempts: Attempt[],
  solution: Password
) {
  return [...attempts, { solution, test: testSolution(password, solution) }];
}

export function hasWinningAttempt(password: Password, attempts: Attempt[]) {
  return attempts.some(
    (attempt) => getCount(SCORE.MATCH, attempt) === password.length
  );
}
