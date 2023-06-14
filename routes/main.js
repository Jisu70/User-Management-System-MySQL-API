const express = require('express') ;

const router = express.Router() ;

const mainController = require('../controllers/main-controller')

router.get('/',mainController.mainRoute)
router.post('/savedata',mainController.saveData)


router.get('/all-users', mainController.getAllUsers);

router.put('/update-user', mainController.updateUsers);

router.post('/delete-user', mainController.deleteUser);

module.exports = router ;