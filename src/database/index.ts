import { createConnection, Connection, getConnectionOptions } from "typeorm";

const isTestEnvironment = () => {
  return process.env.NODE_ENV === "test";
};

const setupDatabaseConnection = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database: isTestEnvironment()
        ? "./src/database/database.test.sqlite"
        : defaultOptions.database,
    })
  );
};

export default setupDatabaseConnection;
