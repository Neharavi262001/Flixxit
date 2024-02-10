const express=require('express')
const router=express.Router()

const {protectedRoutes} =require('../middlewares/authenticationMiddleware')

const { registerUser,loginUser,logoutUser,userProfile,updateUserProfile,} = require('../controllers/userController')
const { viewAvailableSubscriptions, checkoutSession, viewUserSubscriptionDetails } = require('../controllers/subscriptionController')
const { addToWatchlist, getWatchlist, removeFromWatchlist, clearWatchlist } = require('../controllers/watchlistController')
const { like, getRating, dislike } = require('../controllers/ratingController')
const { getWatchHistory, addToWatchHistory, clearWatchHistory } = require('../controllers/watchHistoryController')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',protectedRoutes,logoutUser)


router.get('/profile',protectedRoutes,userProfile)
router.put('/profile',protectedRoutes,updateUserProfile)


router.get('/subscribe',viewAvailableSubscriptions)
router.post('/checkout',protectedRoutes,checkoutSession)
router.get('/subscriptionDetails',protectedRoutes,viewUserSubscriptionDetails)

router.get('/watchList',protectedRoutes,getWatchlist)
router.post('/watchList',protectedRoutes,addToWatchlist)
router.delete('/watchList/:contentId',protectedRoutes,removeFromWatchlist)
router.delete('/watchList',protectedRoutes,clearWatchlist)

router.get('/watchHistory',protectedRoutes,getWatchHistory)
router.post('/watchHistory',protectedRoutes,addToWatchHistory)
router.delete('/watchHistory',protectedRoutes,clearWatchHistory)

router.post('/like/:contentId',protectedRoutes,like)
router.post('/dislike/:contentId',protectedRoutes,dislike)
router.get('/rating/:contentId',protectedRoutes,getRating)



module.exports=router