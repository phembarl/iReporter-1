 import data from '../models/red-flags.js';

 class RedFlags {
	getAllRedFlags (req, res) {
		res.json({
			status: 200,
			data: data
		});
	}

	getSingleRedFlag (req, res) {
		let id = req.params.id;

		const redFlag = data.find(redFlagData => redFlagData.id ===  parseInt(id));

		if(!redFlag){
			return res.status(404).json({
				status: 404,
				error: 'red-flag record not found'
			});
		}
		return res.json({
			status: 200,
			data: [redFlag]
		});
	}

	createRedFlag (req, res) {
		const lastData = data[data.length - 1];
		const newData = {
			status: 201,
			data: [{
				id: lastData.id + 1,
				message: 'Created red-flag record'
			}]
		}

		data.push(newData)
		res.status(201).json({
			newData
		});
	}
}

export default new RedFlags();
