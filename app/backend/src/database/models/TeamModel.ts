<<<<<<< HEAD
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamModel extends Model<InferAttributes<TeamModel>,
InferCreationAttributes<TeamModel>> {
  declare id: CreationOptional<number>;
=======
import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare id: number;
>>>>>>> 2a1cc16c1f8113c026528fc9ce94b00cb01a313e
  declare teamName: string;
}

TeamModel.init({
  id: {
<<<<<<< HEAD
    type: DataTypes.INTEGER,
=======
    type: INTEGER,
>>>>>>> 2a1cc16c1f8113c026528fc9ce94b00cb01a313e
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
<<<<<<< HEAD
    type: DataTypes.STRING,
=======
    type: STRING,
>>>>>>> 2a1cc16c1f8113c026528fc9ce94b00cb01a313e
    allowNull: false,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default TeamModel;
