import {RecursiViz} from './RecursiViz'

describe('eval', () => {
  it('should mutate existing variables', () => {
    let x = 20
    eval('x = 10')
    expect(x).toEqual(10)
  })

  it('should add new variables to the local scope', () => {
    eval('var x = 10')
    expect(x).toEqual(10)

    eval('var helloWorld = () => { return "hello, world"; }')
    expect(helloWorld()).toEqual('hello, world')
  })
})

describe('rewriteUserInput', () => {
  it('should replace all but the first instance of the function name', () => {
    const rv = new RecursiViz(null)
    const input = `function fib(n) {if (n <= 2) return 1; return fib(n - 1) + fib(n - 2);}`
    const rewritten = rv.rewriteUserInput(input, 'fib', 'recurse')
    expect(rewritten).toEqual(`function fib(n) {if (n <= 2) return 1; return recurse(n - 1) + recurse(n - 2);}`)
  })
})

describe('parseUserArgs', () => {
  it('should parse numbers', () => {
    const rv = new RecursiViz(null)

    expect(eval('4')).toEqual(4)
    expect(rv.parseArgs(['4', '[1, 2, 3]', '"4"'])).toEqual([4, [1, 2, 3], '4'])
  })
})
