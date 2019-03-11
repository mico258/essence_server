module.exports = (sequelize, type) => {
    return sequelize.define('method', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        description: type.STRING,
        author: type.STRING,
    })
}
