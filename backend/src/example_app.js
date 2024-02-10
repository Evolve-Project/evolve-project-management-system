const {sequelize, Sequelize} = require('./models');

async function main() {
    await sequelize.sync();
}
main()
