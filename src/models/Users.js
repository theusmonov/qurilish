import { DataTypes, Model } from 'sequelize';
import { User_role } from '../utils/role.js';
import connectDb from '../db/index.js';


export class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: User_role.USER,
      enum: [User_role.ADMIN, User_role.USER],
    },
  },
  {
    sequelize: connectDb,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    deletedAt: true,
  }
);

