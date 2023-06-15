const db = require('../models');

module.exports = {
	findAll: (req, res) => {
		db.Room.find(req.query)
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err));
	},
	
	create: (req, res) => {
		db.Room.create(req.body)
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err));
	},
    findByName: (req, res) => {
		db.Room.findOne({ room_id: req.params.id })
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err));
	},
    addTrack: (req, res) => {
		db.Room.findOneAndUpdate(
			{ room_id: req.params.id },
			{
				$push: { addedTracks: req.body }
			}
		)
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err))
    },
    remove: function (req, res) {
		db.Room.findOne({ _id: req.params.id })
			.then(data => data.remove())
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err));
	}

};
