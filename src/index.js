'use strict'

const { GraphQLScalarType } = require('graphql/type')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')
const ms = require('ms')

const parse = value => {
  const err = `Expected milliseconds human readable but got: ${JSON.stringify(
    value
  )}`
  try {
    const result = ms(value)
    if (typeof result !== 'number') {
      throw new GraphQLError(err)
    }
    return result
  } catch (error) {
    throw new GraphQLError(err)
  }
}

const parseLiteral = (ast, variables) => {
  switch (ast.kind) {
    case Kind.STRING:
      return parse(ast.value)
    case Kind.VARIABLE:
      const name = ast.name.value
      return variables ? parse(variables[name]) : undefined
    default:
      return undefined
  }
}

module.exports = new GraphQLScalarType({
  name: 'MS',
  description:
    'The `MS` scalar type represents milliseconds human readable values as ' +
    'specified by [ms](https://npmjs.com/package/ms).',
  serialize: parse,
  parseValue: parse,
  parseLiteral
})
