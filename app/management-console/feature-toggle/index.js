import development from './env.development';
import production from './env.production';
import { EnvironmentEnum, } from '../../lib/enums';

const {
	DEVELOPMENT,
	PRODUCTION,
} = EnvironmentEnum;

export const FeatureTogglesMap = {
	[DEVELOPMENT]: development,
	[PRODUCTION]: production
};
