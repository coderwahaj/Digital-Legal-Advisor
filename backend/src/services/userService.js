const { User } = require('../models');

class UserService {
  async getUserById(id) {
    const user = await User.findByPk(id);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getAllUsers(filters = {}) {
    const { role, isActive } = filters;
    const where = {};

    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive;

    return await User.findAll({ where });
  }

  async updateUser(id, updateData) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Don't allow updating certain fields
    delete updateData.id;
    delete updateData.email;
    delete updateData.role;

    await user.update(updateData);
    return user;
  }

  async deleteUser(id) {
    const user = await User. findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Soft delete by deactivating
    user.isActive = false;
    await user.save();

    return { message: 'User deactivated successfully' };
  }
}

module.exports = new UserService();