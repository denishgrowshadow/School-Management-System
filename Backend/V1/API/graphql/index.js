const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const path = require('path');
const jwt = require('jsonwebtoken');
const ENV = require('../../config/env.Config');

const typeDefsArray = loadFilesSync(path.join(__dirname, './schema'), { extensions: ['js'] });
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'), { extensions: ['js'] });

const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = mergeResolvers(resolversArray);

async function setupGraphQL(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if (!token) return {};

      try {
        const decoded = jwt.verify(token.replace(/^Bearer\s+/, ''), ENV.JWT_SECRET);

        return { user: decoded };
      } catch (err) {
        throw new AuthenticationError('Invalid or expired token');
      }
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  console.log(`🚀 GraphQL ready at http://localhost:${ENV.PORT}/graphql`);
}

module.exports = setupGraphQL;
