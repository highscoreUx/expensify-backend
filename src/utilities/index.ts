import Redis from "ioredis";
export const redisClient = () => {
	const client = new Redis(process.env.REEDIS_URL!);
	return client;
};
