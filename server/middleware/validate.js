class Midware{

	isValid (req, res, next) {
		const {location, comment} = req.body;

		if(!location) {
			return res.status(400).json({
				status: 400,
				error: 'Input location'
			});
		}else if(typeof(location) !== 'string') {
			return res.status(400).json({
				status: 400,
				error: 'Invalid location'
			});
		}else if(!location.trim()){
			return res.status(400).json({
				status: 400,
				error: 'Invalid location'
			});
		}else if(!comment) {
			return res.status(400).json({
				status: 400,
				error: 'Input comment'
			});
		}else if(!comment.trim()) {
			return res.status(400).json({
				status: 400,
				message: 'Invalid comment'
			});
		}else if(comment.length < 20) {
			return res.status(400).json({
				status: 400,
				error: 'More details please'
			});
		}else return next();
	}

	validateLocation (req, res, next) {
		const location = req.body.location;
		if(!location) {
			return res.status(400).json({
				status: 400,
				error: 'Input location'
			});
		}else if(typeof(location) !== 'string') {
			return res.status(400).json({
				status: 400,
				error: 'Invalid location'
			});
		}else if(!location.trim()){
			return res.status(400).json({
				status: 400,
				error: 'Invalid location'
			});
		}else return next();
	}

	validateComment (req, res, next) {
		const comment = req.body.comment;
		if(!comment) {
			return res.status(400).json({
				status: 400,
				error: 'Input comment'
			});
		}else if(!comment.trim()) {
			return res.status(400).json({
				status: 400,
				message: 'Invalid comment'
			});
		}else if(comment.length < 20) {
			return res.status(400).json({
				status: 400,
				error: 'More details please'
			});
		}else return next();
	}

}

export default new Midware();
