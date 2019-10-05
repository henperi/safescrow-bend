
// Model
import model from '../db/models';

/**
 * Repository
 */
class Repository {
  // public User: Sequelize.ModelCtor<Sequelize.Model> = model.user;

  /**
   * []
   * @param modelName - The name of the model
   * @returns Returns a sequelize model
   */
  static getModel(modelName: keyof typeof model) {
    return model[modelName];
  }
}

export default Repository;
