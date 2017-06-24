const randomInt = require('random-int')

const VALID = exports.VALID = 'valid'
const MATCH = exports.MATCH = 'match'
const CORRECT = exports.CORRECT = 'correct'
const INCORRECT = exports.INCORRECT = 'incorrect'

exports.createPassword = function (len) {
  const pw = []

  for (i=len; i > 0; i--) {
    pw.push(Number(randomInt(0,9)))
  }

  return pw
}

exports.test = function (pw, solution) {
  const _pw = new Set(pw)
  const _solution = new Set(solution)

  const isValid = pw.length === solution.length && solution.every(el => Number.isInteger(el))

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
