const WatchHistory=require('../models/watchHistoryModel')
const asyncHandler=require('express-async-handler')

const addToWatchHistory=asyncHandler(async(req,res)=>{
 
   try {
    const {contentId,contentTitle,contentPoster,contentType,contentRating}=req.body
    const isAdded=await WatchHistory.findOne({
        user:req.user.id,
        contentId
    })

    if(isAdded) {
       return res.status(200).json(isAdded)
    }

   

    const addItem=new WatchHistory({
        contentId,
        contentPoster,
        contentTitle,
        contentType,
        contentRating,
        user:req.user.id,
        
    })

    await addItem.save()
     res.status(201).json(addItem)

   } catch (error) {
    console.error("Error adding to WatchHistory:", error);
    res.status(500).json({ error: "Internal Server Error" });

   }
})



  

const getWatchHistory=asyncHandler(async(req,res)=>{
    try {
        const watchHistory=await WatchHistory.find({user:req.user.id}).sort("-createdAt");
        res.status(200).json(watchHistory)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

const clearWatchHistory = asyncHandler(async (req, res) => {
    try {
     
      const watchHistoryItems = await WatchHistory.find({ user: req.user.id });
  
      if (watchHistoryItems.length === 0) {
        return res.status(404).json({ error: "WatchHistory is already empty" });
      }
      await WatchHistory.deleteMany({ user: req.user.id });
  
      res.status(200).json({ message: "WatchHistory cleared successfully" });
    } catch (error) {
      console.error("Error clearing watchHistory:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


module.exports={addToWatchHistory,getWatchHistory,clearWatchHistory}