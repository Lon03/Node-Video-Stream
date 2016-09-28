/*********************************************************************
 *                        Module dependencies
 *********************************************************************/
const express = require('express')
const router = express.Router()
const controller = require('./controller')


router.route('/')
    .get(controller.apiGet)
router.route('/movies/:id')
    .get(controller.moviesId)


module.exports = router