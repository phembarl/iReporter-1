 import data from '../models/red-flags.js';


 class RedFlags {
	getAllRedFlags (req, res) {
		res.json({
			status: 200,
			data: data
		});
	}

	getSingleRedFlag (req, res) {
		let id = Number(req.params.id);

		const redFlag = data.find(redFlagData => redFlagData.id === id);

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
		const {location, Images, Videos, comment} = req.body;
		const lastData = data[data.length - 1];
		const newData = {
			id: lastData.id + 1,
    			createdOn: new Date().toString(),
    			createdBy: lastData.createdBy + 1,
    			type: 'red-flag', 
    			location, 
    			status: 'Pending',
    			Images: ['video1', 'video2'],
    			Videos: ['image1', 'image2'],
    			comment
		}
		
		data.push(newData)
		res.status(201).json({
			status: 201,
			data:[{
				id: newData.id,
				message: 'Created red-flag record'
			}]
		});
	}

	editLocation (req, res) {
		let id = Number(req.params.id);

		const redFlag = data.find(redFlagData => redFlagData.id === id);

		if(!redFlag){
			return res.status(404).json({
				status: 404,
				error: 'red-flag record not found'
			});
		}
		redFlag.location = req.body.location;
		return res.json({
			status: 200,
			data: [{
				id: redFlag.id,
				message: '“Updated red-flag record’s location'
			}]
		});
	}

	editComment (req, res) {
		let id = Number(req.params.id);

		const redFlag = data.find(redFlagData => redFlagData.id === id);

		if(!redFlag){
			return res.status(404).json({
				status: 404,
				error: 'red-flag record not found'
			});
		}
		redFlag.comment = req.body.comment;
		return res.json({
			status: 200,
			data: [{
				id: redFlag.id,
				message: '“Updated red-flag record’s comment'
			}]
		});
	}

	deleteRedFlag (req, res) {
		let id = Number(req.params.id);
		const redFlag = data.find(redFlagData => redFlagData.id === id);

		if(!redFlag){
			return res.status(404).json({
				status: 404,
				error: 'red-flag record not found'
			});
		}
		const position = data.indexOf(redFlag);
		data.splice(position, 1);
		res.json({
			status: 200,
			data: redFlag.id,
			message : 'red-flag record has been deleted'
		})

	}
}

export default new RedFlags();
