const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dataset = sequelize.define('Dataset', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes. UUIDV4,
      primaryKey: true
    },
    datasetType: {
      type:  DataTypes. ENUM('case_law', 'statute', 'precedent', 'regulation'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    usageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lastUpdated: {
      type:  DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'datasets',
    timestamps: true
  });

  return Dataset;
};