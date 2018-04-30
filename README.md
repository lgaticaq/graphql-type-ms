# graphql-type-ms

[![npm version](https://img.shields.io/npm/v/graphql-type-ms.svg)](https://www.npmjs.com/package/graphql-type-ms)
[![npm downloads](https://img.shields.io/npm/dm/graphql-type-ms.svg)](https://www.npmjs.com/package/graphql-type-ms)
[![Build Status](https://travis-ci.org/lgaticaq/graphql-type-ms.svg?branch=master)](https://travis-ci.org/lgaticaq/graphql-type-ms)
[![Coverage Status](https://coveralls.io/repos/github/lgaticaq/graphql-type-ms/badge.svg?branch=master)](https://coveralls.io/github/lgaticaq/graphql-type-ms?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/7d2accb39a80b8ee6573/maintainability)](https://codeclimate.com/github/lgaticaq/graphql-type-ms/maintainability)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/graphql-type-ms.svg)](https://david-dm.org/lgaticaq/graphql-type-ms#info=devDependencies)

> ms scalar type for GraphQL.js

## Installation

```bash
npm i graphql-type-ms
```

## Use

```js
const GraphQLMS = require("graphql-type-ms");
const ms = require("ms");
const { GraphQLNonNull, GraphQLInt } = require("graphql/type");

exports.myMutation = {
  type: GraphQLInt,
  args: {
    expire: {
      type: new GraphQLNonNull(GraphQLMS),
      description: "Identificador del Usuario"
    }
  },
  resolve: (root, { expire }) => ms(expire)
};
```

## Licencia

[MIT](https://tldrlegal.com/license/mit-license)
