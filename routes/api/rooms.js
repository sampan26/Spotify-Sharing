const router = require('express').Router();
const roomsController = require('../../controllers/roomsController');

router.route('/').get(roomsController.findAll).post(roomsController.create);

router
	.route('/:id')
	.get(roomsController.findByName)
	.put(roomsController.addTrack)
	.delete(roomsController.remove);


module.exports = router;