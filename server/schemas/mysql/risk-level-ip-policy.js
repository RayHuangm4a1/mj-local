const { Address4, Address6 } = require('ip-address');
const Sequelize = require("sequelize");

const schema = {
	ip: {
		type: 'VARBINARY(16)',
		allowNull: false,
		set: function(value) {
			try {
				const address4 = new Address4(value);
				const address6 = new Address6(value);

				if (address4.isValid() || address6.isValid()) {
					this.setDataValue('ip', Sequelize.fn('INET6_ATON', value));
				} else {
					this.setDataValue('ip', null);
				}
			} catch {
				this.setDataValue('ip', null);
			}
		},
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ["ip"],
		},
	]
};

module.exports = {
	schema,
	indexes,
};
