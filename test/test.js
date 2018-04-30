'use strict'

const { describe, it } = require('mocha')
const { expect } = require('chai')
const { Kind } = require('graphql/language')
const GraphQLMS = require('../src')

describe('GraphQLMS', () => {
  describe('serialize', () => {
    it('should error when serializing a number value', () => {
      try {
        GraphQLMS.serialize(2)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: 2'
        )
      }
    })
    it('should error when serializing a null value', () => {
      try {
        GraphQLMS.serialize(null)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: null'
        )
      }
    })
    it('should error when serializing a undefined value', () => {
      try {
        GraphQLMS.serialize(undefined)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: undefined'
        )
      }
    })
    it('should serialize a string value', () => {
      expect(GraphQLMS.serialize('2 days')).to.equal(172800000)
    })
  })

  describe('parseValue', () => {
    it('should error when serializing a number value', () => {
      try {
        GraphQLMS.parseValue(2)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: 2'
        )
      }
    })
    it('should error when serializing a null value', () => {
      try {
        GraphQLMS.parseValue(null)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: null'
        )
      }
    })
    it('should error when serializing a undefined value', () => {
      try {
        GraphQLMS.parseValue(undefined)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: undefined'
        )
      }
    })
    it('should parse a string value to int', () => {
      expect(GraphQLMS.parseValue('2 days')).to.equal(172800000)
    })
  })

  describe('parseLiteral', () => {
    it('should error when parsing a ast int', () => {
      try {
        const ast = {
          kind: Kind.INT
        }
        GraphQLMS.parseLiteral(ast)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: 2'
        )
      }
    })
    it('should error when parsing a ast null', () => {
      try {
        const ast = {
          kind: Kind.NULL
        }
        GraphQLMS.parseLiteral(ast)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: null'
        )
      }
    })
    it('should error when parsing ast w/ invalid value', () => {
      try {
        const ast = {
          kind: Kind.STRING,
          value: 'asdasd'
        }
        GraphQLMS.parseLiteral(ast)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: "asdasd"'
        )
      }
    })
    it('should error when parsing ast w/ invalid variable value', () => {
      try {
        const ast = {
          kind: Kind.VARIABLE,
          name: { value: 'ms' }
        }
        GraphQLMS.parseLiteral(ast)
      } catch (err) {
        expect(err.message).to.equal(
          'Expected milliseconds human readable but got: undefined'
        )
      }
    })
    it('should parse a ast literal', () => {
      const ast = {
        kind: Kind.STRING,
        value: '2 days'
      }
      expect(GraphQLMS.parseLiteral(ast)).to.equal(172800000)
    })
    it('should parse a ast literal with variable', () => {
      const ast = {
        kind: Kind.VARIABLE,
        name: { value: 'ms' }
      }
      const variables = { ms: '2 days' }
      expect(GraphQLMS.parseLiteral(ast, variables)).to.equal(172800000)
    })
  })
})
