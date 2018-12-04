import data from '../models/red-flags.js';

const createRedFlag = (req, res) => {
	const lastData = data[data.length - 1];
	const newData = {
		status: 201,
		data: [{
			id: lastData.id + 1,
    		message: 'Created red-flag record'
		}]
	}

	data.push(newData)
	res.json({
		newData
	});
}

export default createRedFlag;