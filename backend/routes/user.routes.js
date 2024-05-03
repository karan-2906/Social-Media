const Router = require('express')
const router = Router()

const { registerUser, loginUser , updateavatar, verifyemail, userFollowUnfollow, userInfo , userProfile, editProfile } = require ("../controllers/user.controllers")
const { verifyJWT } = require('../middleware/auth.middleware')

router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.post('/updateavatar/:userId' , updateavatar)
router.post('/userinfo' ,verifyJWT, userInfo)
router.post('/userprofile/:userID' ,verifyJWT, userProfile)
router.post('/userfollowunfollow:followuserID' ,verifyJWT, userFollowUnfollow)
router.post('/editprofile' ,verifyJWT, editProfile)
router.route('/emailverify/:tokenId').get(verifyemail);


module.exports = router;