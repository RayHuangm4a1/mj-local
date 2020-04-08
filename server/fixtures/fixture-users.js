const UserModel = require("../models/user");
const RelationshipModel = require("../models/relationship");
const WalletModel = require("../models/wallet");
const UserStatsModel = require("../models/user-stats");
const TeamStatsModel = require("../models/team-stats");
const TeamBonusStatsModel = require("../models/team-bonus-stats");
const LevelModel = require("../models/level");
const UserBankCardModel = require("../models/user-bank-card");
const fixturedUsers = require("./data/user");
const {
	ENUM_WALLET_CODE,
	ENUM_BANK_CARD_STATUS,
} = require("../lib/enum");
const logger = require("ljit-logger")("debug");
const { sumBy } = require("ljit-collection");
const { Op } = require("sequelize");

async function createUsersDocuments (fixturedUsers) {
	for (let i = 0; i < fixturedUsers.length; i++) {
		const user = await UserModel.create(fixturedUsers[i]);

		await LevelModel.increment({
			numOfUsers: 1
		}, {
			where: {
				id: user.levelId
			},
		});

		const {
			ancestorUsernames, wallets, bankCardIds,
		} = fixturedUsers[i];

		const fixturedWallets = wallets.map(wallet => {
			wallet.userId = user.id;
			wallet.username = user.username;

			return wallet;
		});

		const userStatses = wallets
			.filter(wallet => wallet.code !== ENUM_WALLET_CODE.SUPERVISION)
			.map(wallet => {
				return {
					userId: user.id,
					username: user.username,
					walletCode: wallet.code,
				};
			});
		const teamStatses = wallets
			.filter(wallet => wallet.code !== ENUM_WALLET_CODE.SUPERVISION)
			.map(wallet => {
				return {
					userId: user.id,
					username: user.username,
					walletCode: wallet.code,
				};
			});

		const preparedUserBankCards = bankCardIds.map(bankCardId => {
			const currentDate = new Date();

			return {
				userId: user.id,
				bankCardId,
				withdrawableAt: currentDate,
				activatedAt: currentDate,
				status: ENUM_BANK_CARD_STATUS.ACTIVE,
			};
		});

		await UserStatsModel.insertMany(userStatses);
		await TeamStatsModel.insertMany(teamStatses);
		await WalletModel.insertMany(fixturedWallets);
		await UserBankCardModel.insertMany(preparedUserBankCards);

		const preparedRelationships = [{
			userId: user.id,
			username: user.username,
			ancestorId: user.id,
			ancestorUsername: user.username,
			distance: 0,
		}];

		const ancestors = await UserModel.find({
			where: {
				username: {
					[Op.in]: ancestorUsernames,
				}
			},
			attributes: ["id", "username"],
		});

		for (let j = 0; j < ancestorUsernames.length; j++) {
			const ancestorUsername = ancestorUsernames[j];
			const ancestor = ancestors.find(({ username }) => username === ancestorUsername);

			if (ancestor === null) {
				throw new Error(`ancestor ${ancestorUsername} is not found`);
			}

			preparedRelationships.push({
				userId: fixturedUsers[i].id,
				username: fixturedUsers[i].username,
				ancestorId: ancestor.id,
				ancestorUsername: ancestor.username,
				distance: j + 1,
			});
		}

		await RelationshipModel.insertMany(preparedRelationships);
	}

	for (let i = 0; i < fixturedUsers.length; i++) {
		const relationships = await RelationshipModel.find({
			where: {
				ancestorId: fixturedUsers[i].id,
			}
		});
		const userIds = relationships.map(relationship => relationship.userId);

		const wallets = await WalletModel.find({
			where: {
				userId: {
					[Op.in]: userIds,
				},
				code: ENUM_WALLET_CODE.PRIMARY,
			},
		});

		const balance = sumBy(wallets, ["balance"]);
		const numOfNonZeroBalanceUsers = wallets.filter(wallet => wallet.balance > 0).length;
		const numOfZeroBalanceUsers = wallets.filter(wallet => wallet.balance <= 0).length;

		await TeamStatsModel.update({
			numOfUsers: userIds.length,
			balance,
			numOfZeroBalanceUsers,
			numOfNonZeroBalanceUsers,
		}, {
			where: {
				userId: fixturedUsers[i].id,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
			}
		});

		for (let j = 0; j < userIds.length; j++) {
			const user = await UserModel.findOne({
				where: {
					id: userIds[j],
				}
			});

			await TeamBonusStatsModel.upsert({
				userId: fixturedUsers[i].id,
				username: fixturedUsers[i].username,
				deltaBonus: user.deltaBonus,
				numOfUsers: 1,
			}, {
				fields: [],
				incrementFields: ["numOfUsers"],
			});
		}
	}
}
async function init() {
	try {
		await createUsersDocuments(fixturedUsers);
		logger.info("[mysql][users] fixture done");
	} catch (error) {
		logger.info("[mysql][users] fixture failed", error.stack);
	}
}

async function drop() {
	await UserModel.getInstance().sync({ force: true });
	await RelationshipModel.getInstance().sync({ force: true });
	await WalletModel.getInstance().sync({ force: true });
	await UserBankCardModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;
exports.createUsersDocuments = createUsersDocuments;
