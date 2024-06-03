module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define(
    "Notes",
    {

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
