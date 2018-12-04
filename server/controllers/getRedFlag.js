import data from '../models/red-flags.js';

const getRedFlag = (req, res) => {
	let id = req.params.id;

	const redFlag = data.find(redFlagData => redFlagData.id === Number(id));
	if(!redFlag){
		res.json({
			status: 400,
			error: 'red-flag record not found'
		});
	}
	res.json({
		status: 200,
		data: [redFlag]
	});
}

export default getRedFlag;