import randomInt from 'random-int'

export const VALID = 'valid'
export const SCORE = 'score'
export const MATCH = 'match'
export const CORRECT = 'correct'
export const PASS = 'pass'

export function createPassword (len, values = 10) {
  const pw = []

  for (let i = len; i > 0; i--) {
    pw.push(Number(randomInt(0, values - 1)))
  }

  return pw
}

export function validate (pw, solution) {
  const hasCorrectLength = pw.length === solution.length
  const hasOnlyIntegers = solution.every(el => Number.isInteger(el))

  return hasCorrectLength && hasOnlyIntegers
}

export function test (pw, solution) {
  const isValid = validate(pw, solution)

  if (isValid === false) {
    return {
      [VALID]: isValid
    }
  }

  const score = pw.slice()
  const solutionClone = solution.slice()

  for (let i in pw) {
    const el0 = pw[i]
    const el1 = solution[i]

    if (el0 === el1) {
      score[i] = solutionClone[i] = MATCH
      MATCH
    } else if (solutionClone.includes(el0)) {
      const idx = solutionClone.indexOf(el0)
      score[i] = solutionClone[idx] = CORRECT
    } else {
      score[i] = solutionClone[i] = PASS
    }
  }

  return {
    [VALID]: isValid,
    [SCORE]: score
  }
}

export function getCount (mark, score) {
  return score.filter(el => el === mark).length
}

export function makeAttempt (pw, attempts, solution) {
  return [...attempts, {solution, test: test(pw, solution)}]
}

export function hasWinningAttempt (pw, attempts) {
  return attempts.some(attempt => getCount(MATCH, attempt.test[SCORE]) === pw.length)
}
