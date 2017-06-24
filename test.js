const {createPassword, test} = require('./')
const {VALID, MATCH, CORRECT, INCORRECT} = require('./')

describe('createPassword', () => {
  it('given length', () => {
    expect(createPassword(5).length).toBe(5);
    expect(createPassword(4).length).toBe(4);
    expect(createPassword(3).length).toBe(3);
    expect(createPassword(2).length).toBe(2);
  });

  it('full of integers', () => {
    const pw = createPassword(5)

    pw.forEach((i) => {
      expect(i).toEqual(expect.any(Number));
    })
  });
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
