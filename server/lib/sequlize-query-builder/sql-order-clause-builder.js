class SQLOrderClauseBuilder {
	constructor() {
		this.orderClause = [];
	}

	setRefOrder(ref, field, rule) {
		if (this.isInvalidFieldOrRule(field, rule)) {
			return this;
		}
		this.orderClause.push([ref, field, rule]);

		return this;
	}

	setOrder(field, rule) {
		if (this.isInvalidFieldOrRule(field, rule)) {
			return this;
		}
		this.orderClause.push([field, rule]);

		return this;
	}

	isInvalidFieldOrRule(field, rule) {
		return (
			field === undefined ||
			field === null ||
			rule === undefined ||
			rule === null
		);
	}

	build() {
		return this.orderClause;
	}
}

module.exports = SQLOrderClauseBuilder;
