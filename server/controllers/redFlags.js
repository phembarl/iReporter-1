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
       location: location.trim(),
       status: 'Pending',
       Images: ['video1', 'video2'],
       Videos: ['image1', 'image2'],
       comment: comment.trim()
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
 }

export default new RedFlags();
