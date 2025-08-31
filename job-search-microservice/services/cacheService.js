const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

const cacheService = {
    async getCachedJobs(key) {
        const data = await getAsync(key);
        return data ? JSON.parse(data) : null;
    },

    async setCachedJobs(key, data, expiration = 3600) {
        await setAsync(key, JSON.stringify(data), 'EX', expiration);
    },

    async clearCache(key) {
        return new Promise((resolve, reject) => {
            redisClient.del(key, (err, response) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
    },
};

module.exports = cacheService;