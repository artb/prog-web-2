var models = require('../models/index');
var Area = models.area;

const index = async (req, res) => {
	const areas = await Area.findAll();
	res.render('area/index', {
		areas:areas,
	});
};
module.exports = { index }