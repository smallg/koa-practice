class UserService {
  async createUser(username, pwd) {
    return 'ok';
  }
}

module.exports = new UserService();