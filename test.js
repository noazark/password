const {
  createPassword,
  test,
  validate,
  getCount
} = require('./')
const {VALID, SCORE, MATCH, CLOSE_MATCH, PASS} = require('./')

describe('createPassword', () => {
  it('given length', () => {
    expect(createPassword(5).length).toBe(5)
    expect(createPassword(4).length).toBe(4)
    expect(createPassword(3).length).toBe(3)
    expect(createPassword(2).length).toBe(2)
  })

  it('given values', () => {
    expect(createPassword(100, 10).every((el) => el >= 0 && el <= 9)).toBeTruthy()
    expect(createPassword(100, 5).every((el) => el >= 0 && el <= 4)).toBeTruthy()
    expect(createPassword(100, 2).every((el) => el >= 0 && el <= 1)).toBeTruthy()
  })

  it('full of integers', () => {
    const pw = createPassword(5)

    pw.forEach((i) => {
      expect(i).toEqual(expect.any(Number))
    })
  })
})

describe('validate', () => {
  it('valid solution', () => {
    const pw = [1, 2, 3]
    const s = [4, 5, 6]

    expect(validate(pw, s)).toBeTruthy()
  })

  it('solution must be same length as password', () => {
    const pw = [1, 2, 3]

    let s

    s = [1, 2, 3, 4]
    expect(validate(pw, s)).toBeFalsy()

    s = [1, 2]
    expect(validate(pw, s)).toBeFalsy()
  })

  it('solution must only include integers', () => {
    const pw = [1, 2, 3]
    const s = [1, 2, '3']

    expect(validate(pw, s)).toBeFalsy()
  })
})

describe('test', () => {
  it('solution must be same length as password', () => {
    const pw = [1, 2, 3]

    let s, e
    e = {[VALID]: false}

    s = [1, 2, 3, 4]
    expect(test(pw, s)).toMatchObject(e)

    s = [1, 2]
    expect(test(pw, s)).toMatchObject(e)
  })

  it('solution must only include integers', () => {
    const pw = [1, 2, 3]
    const s = [1, 2, '3']
    const e = {[VALID]: false}

    expect(test(pw, s)).toMatchObject(e)
  })

  it('perfect solution', () => {
    const pw = [1, 2, 3]
    const s = [1, 2, 3]
    const e = {[VALID]: true, [SCORE]: [MATCH, MATCH, MATCH]}

    expect(test(pw, s)).toMatchObject(e)
  })

  it('solution close matches', () => {
    const pw = [1, 2, 3]
    const s = [2, 1, 3]
    const e = {[VALID]: true, [SCORE]: [CLOSE_MATCH, CLOSE_MATCH, MATCH]}

    expect(test(pw, s)).toMatchObject(e)
  })

  it('duplicates', () => {
    const pw = [1, 2, 3]
    const s = [1, 1, 4]
    const e = {[VALID]: true, [SCORE]: [MATCH, PASS, PASS]}

    expect(test(pw, s)).toMatchObject(e)
  })

  it('duplicates are hard', () => {
    let pw, s, e
    pw = [0, 2, 0]
    s = [7, 2, 0]
    e = {[VALID]: true, [SCORE]: [PASS, MATCH, MATCH]}

    expect(test(pw, s)).toMatchObject(e)
    pw = [1, 4, 2]
    s = [1, 2, 3]
    e = {[VALID]: true, [SCORE]: [MATCH, CLOSE_MATCH, PASS]}

    expect(test(pw, s)).toMatchObject(e)
  })

  it('even works with arbitrarily long passwords', () => {
    const pw = [5, 8, 2, 3, 1, 5, 9, 8]
    const s = [2, 8, 7, 7, 1, 1, 5, 7]
    const e = {
      [VALID]: true,
      [SCORE]: [CLOSE_MATCH, MATCH, PASS, PASS, MATCH, PASS, CLOSE_MATCH, PASS]
    }

    expect(test(pw, s)).toMatchObject(e)
  })
})

describe('getCount', () => {
  it('all matches', () => {
    expect(getCount(MATCH, {test: {score: [MATCH, MATCH, MATCH]}})).toBe(3)
  })

  it('single match', () => {
    expect(getCount(MATCH, {test: {score: [PASS, MATCH, CLOSE_MATCH]}})).toBe(1)
  })

  it('none match', () => {
    expect(getCount(MATCH, {test: {score: [PASS, CLOSE_MATCH, PASS]}})).toBe(0)
  })
})
