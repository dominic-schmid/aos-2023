export type HeartRate = {
	timestamp: Date;
	rate: number;
};

export type Day4APIResult = {
	heartRate: number;
};

export type ChartDataType = 'mock' | 'API';
