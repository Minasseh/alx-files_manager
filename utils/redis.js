const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    async isAlive() {
        try {
            await this.client.ping();
            return true;
        } catch (error) {
            return false;
        }
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    async set(key, value, durationInSeconds) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, durationInSeconds, value, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, numDeleted) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numDeleted > 0);
                }
            });
        });
    }
}
const redisClient = new RedisClient();
module.exports = redisClient;
