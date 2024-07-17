import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("next24_manha", "root", "8589", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});
