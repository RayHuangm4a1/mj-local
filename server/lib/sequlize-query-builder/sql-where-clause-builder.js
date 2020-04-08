const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class SQLWhereClauseBuilder {
	constructor() {
		this.whereClause = {};
	}

	setIn(key, value) {
		const operator = Op.in;

		this.setWhereClause(operator, key, value);

		return this;
	}

	setEqual(key, value) {
		const operator = Op.eq;

		this.setWhereClause(operator, key, value);

		return this;
	}

	setGt(key, value) {
		const operator = Op.gt;

		this.setWhereClause(operator, key, value);

		return this;
	}

	setGte(key, value) {
		const operator = Op.gte;

		this.setWhereClause(operator, key, value);

		return this;
	}

	setLt(key, value) {
		const operator = Op.lt;

		this.setWhereClause(operator, key, value);

		return this;
	}

	setLte(key, value) {
		const operator = Op.lte;

		this.setWhereClause(operator, key, value);

		return this;
	}

	setWhereClause(operator, key, value) {
		if (value === undefined || value === null) {
			return;
		}

		if (this.whereClause[key] === undefined) {
			this.whereClause[key] = {};
		}

		this.whereClause[key][operator] = value;
	}

	build() {
		return this.whereClause;
	}
}

module.exports = SQLWhereClauseBuilder;
