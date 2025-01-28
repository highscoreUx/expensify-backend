import Redis from "ioredis";

export class RedisAdapter {
	static client: Redis;

	constructor(redisUrl: string) {
		if (!RedisAdapter.client) {
			RedisAdapter.client = new Redis(redisUrl);
		}
	}

	static async get(key: string) {
		const content = await RedisAdapter.client.get(key);
		return content;
	}
}
