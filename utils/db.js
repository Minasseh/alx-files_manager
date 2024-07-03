const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async isAlive() {
    try {
      await this.client.connect();
      return true;
    } catch (error) {
      return false;
    } finally {
      await this.client.close();
    }
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const usersCollection = this.client.db().collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      return 0;
    } finally {
      await this.client.close();
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const filesCollection = this.client.db().collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      return 0;
    } finally {
      await this.client.close();
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
