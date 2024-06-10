import { DataTypes, Model } from 'sequelize';
import connectDb from '../db/index.js';

export class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categoryImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: connectDb,
    tableName: 'category',
    timestamps: true,
    paranoid: true,
    deletedAt: true,
  }
);
 
