module.exports = function preparePlays(req, res, next) {
	const { max: platformBonus } = res.locals.platform.bonus;

	try {
		res.locals.plays = req.body.map(row => {
			const element = {
				id: row.id,
				award: row.award,
			};

			if (row.bonus !== undefined) {
				element.deltaBonus = parseInt(row.bonus) - platformBonus;
			}

			if (row.isPKEnabled !== undefined) {
				element.isPKEnabled = !!Number(row.isPKEnabled);
				element.count = parseInt(row.count);
			}

			return element;
		});
	} catch (error) {
		return next(error);
	}

	next();
};
