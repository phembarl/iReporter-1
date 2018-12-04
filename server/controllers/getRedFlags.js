import data from '../models/red-flags.js';

const getRedFlags = (req, res) => {
	res.json({
		status: 200,
		data: data
	});
}


export default getRedFlags;