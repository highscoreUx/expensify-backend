export interface redisPort {
	get(key: string): Promise<string | null>;
}
