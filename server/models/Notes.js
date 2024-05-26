module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define(
    "Notes",
    {
    //   ID: {
    //     type: DataTypes.INTEGER, // Corrected to lowercase "integer"
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true,
    //   },
      TaskName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    },
    {
      timestamps: false,
    }
  );

  return Notes;
};
