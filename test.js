const {createPassword, test, validate} = require('./')
const {VALID, MATCH, CORRECT, INCORRECT} = require('./')

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

    let s, e

    s = [1, 2, '3']
    e = {[VALID]: false}
    expect(test(pw, s)).toMatchObject(e)
  })

  it('perfect solution', () => {
    const pw = [1, 2, 3]

    let s, e

    // perfect
    s = [1, 2, 3]
    e = {[VALID]: true, [MATCH]: 3, [CORRECT]: 3, [INCORRECT]: 0}
    expect(test(pw, s)).toMatchObject(e)

    // duplicates are counted once
    s = [1, 4, 4]
    e = {[VALID]: true, [MATCH]: 1, [CORRECT]: 1, [INCORRECT]: 1}
    expect(test(pw, s)).toMatchObject(e)

    // correctness
    s = [2, 1, 3]
    e = {[VALID]: true, [MATCH]: 1, [CORRECT]: 3, [INCORRECT]: 0}
    expect(test(pw, s)).toMatchObject(e)
  })

  it('even works with arbitrarily long passwords', () => {
    const pw = [5, 8, 2, 3, 1, 5, 9, 8]

    let s, e

    s = [2, 8, 7, 7, 1, 1, 5, 7]
    e = {[VALID]: true, [MATCH]: 2, [CORRECT]: 4, [INCORRECT]: 1}
    expect(test(pw, s)).toMatchObject(e)
  })
})
