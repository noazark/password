import randomInt from 'random-int'

export const VALID = 'valid'
export const MATCH = 'match'
export const CORRECT = 'correct'
export const INCORRECT = 'incorrect'

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
  const _pw = new Set(pw)
  const _solution = new Set(solution)

  const isValid = validate(pw, solution)

  if (isValid === false) {
    return {
      [VALID]: isValid
    }
  }

  const matches = solution.filter((i, idx) => pw[idx] === i)
  const corrects = [..._solution].filter(x => _pw.has(x))
  const incorrects = [..._solution].filter(x => !_pw.has(x))

  return {
    [VALID]: isValid,
    [MATCH]: matches.length,
    [CORRECT]: corrects.length,
    [INCORRECT]: incorrects.length
  }
}

export function makeAttempt (pw, attempts, solution) {
  return [...attempts, {solution, test: test(pw, solution)}]
}

export function hasWinningAttempt (pw, attempts) {
  return attempts.some(attempt => attempt.test.match === pw.length)
}
