module.exports = (sequelize, type) => {
    return sequelize.define('alpha', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        method_id: type.INTEGER,
        type: type.STRING,
    })
}
