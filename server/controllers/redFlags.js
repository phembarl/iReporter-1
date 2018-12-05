 import data from '../models/red-flags.js';

 class Routes {
	getRedFlags (req, res) {
		res.json({
			status: 200,
			data: data
		});
	}

	getRedFlag (req, res) {
		let id = parseInt(req.params.id);


		const redFlag = data.find(redFlagData => redFlagData.id === id);

		if(!redFlag){
			res.json({
				status: 404,
				error: 'red-flag record not found'
			});
		}
		res.json({
			status: 200,
			data: [redFlag]
		});
	}

	createRedFlag (req, res) {
		const lastData = data[data.length - 1];
		const newData = {
			status: 201,
			data: [{
				id: parseInt(lastData.id + 1),
				message: 'Created red-flag record'
			}]
		}

		data.push(newData)
		res.json({
			newData
		});
	}
}

export default new Routes();
