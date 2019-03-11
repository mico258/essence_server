module.exports = (sequelize, type) => {
    return sequelize.define('intention', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING
    })
}
