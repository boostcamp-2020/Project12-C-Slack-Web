const express = require('express')
const router = express.Router()
const searchController = require('./search')

/* POST /api/search/uesr  search user  */
router.post('/user', searchController.searchUser)

module.exports = router
