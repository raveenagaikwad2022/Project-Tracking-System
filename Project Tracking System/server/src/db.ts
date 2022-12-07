import "reflect-metadata";
import { createConnection } from "typeorm";

export const connectToDB = async () => {
  try {
    await createConnection({
      type: "mysql",
      url:
        process.env.DATABASE_URL ||
        `mysql://root:cdac@127.0.0.1:3306/test`,
      entities: [
        process.env.NODE_ENV === "test"
          ? "src/entity/**/*.ts"
          : "build/entity/**/*.js",
      ],
      migrations: [
        process.env.NODE_ENV === "test"
          ? "src/migration/**/*.ts"
          : "build/migration/**/*.js",
      ],
      cli: {
        entitiesDir:
          process.env.NODE_ENV === "test" ? "src/entity" : "build/entity",
        migrationsDir:
          process.env.NODE_ENV === "test" ? "src/migration" : "build/migration",
      },
      synchronize: false,
      logging: false,
    });
    console.log("MYSQL connected!");
  } catch (error) {
    console.log(error);
  }
};
