import { DataTypes, Model } from 'sequelize';
import connectDb from '../db/index.js';
import { Category } from './Category.js';


export class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    star: {
       type: DataTypes.STRING,
       allowNull: false
    },
    features: {
        type : DataTypes.STRING,
        allowNull : false
    },
    material: {
        type: DataTypes.STRING,
        allowNull : false
    },
    telephone: {
       type: DataTypes.STRING,
       allowNull: false
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize: connectDb,
    tableName: 'product',
    timestamps: true,
    paranoid: true,
    deletedAt: true,
    underscored: true
  }
);


