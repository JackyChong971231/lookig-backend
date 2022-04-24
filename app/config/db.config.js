/**
 * Summary:  configure MySQL database & Sequelize
 * 
 * @param   USER          User of MySQL Database
 * @param   PASSWORD      Password to the MySQL Database
 * @param   DB            Name of the database
 * @param   HOST          MySQL Database
 * @param   dialect       Dialect
 * @param   pool
 *    @param    max       Maximum number of connection in pool
 *    @param    min       Minimum number of connection in pool
 *    @param    acquire   Maximum time, in milliseconds, that pool will try 
 *                        to get connection before throwing error
 *    @param    idle      Maximum time, in milliseconds, that a connection can be 
 *                        idle before being released
*/
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "021Aa4098",
  DB: "lookig",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
