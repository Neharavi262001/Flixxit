const Rating=require('../models/ratingModel')
const asyncHandler=require('express-async-handler')

const like=asyncHandler(async(req,res)=>{
    try {
        const {contentId}=req.params
        const user=req.user.id

        const existingRating=await Rating.findOne({contentId,user})
        if(existingRating){
            existingRating.dislikes = 0;
            existingRating.likes = 1;
            await existingRating.save(); 
        }
        else{
            await Rating.create({ user, contentId, likes: 1 });
        }

        const updatedRating = await Rating.findOne({ contentId, user });
        const updatedLikes = updatedRating ? updatedRating.likes : 0;
        return res.status(200).json({
            contentId,
            user,
            likes: updatedLikes,
            message: 'Content liked successfully',
          });
        

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

})

const dislike=asyncHandler(async(req,res)=>{
    try {
        const { contentId} = req.params;
        const user=req.user.id
    
       
        const existingRating = await Rating.findOne({ contentId, user });
    
        if (existingRating) {
          
          existingRating.likes = 0;
          existingRating.dislikes = 1;
          await existingRating.save();
        } else {
          await Rating.create({ user, contentId, dislikes: 1 });
        }
    
        
        const updatedRating = await Rating.findOne({ contentId, user });
        const updatedDislikes = updatedRating ? updatedRating.dislikes : 0;
    
       
        return res.status(200).json({
          contentId,
          user,
          dislikes: updatedDislikes,
          message: 'Content disliked successfully',
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
})

const getRating=asyncHandler(async(req,res)=>{
    try {
        const { contentId } = req.params;
        const ratings = await Rating.find({ contentId });
        const likes = ratings.reduce((total, rating) => total + rating.likes, 0);
        const dislikes = ratings.reduce((total, rating) => total + rating.dislikes, 0);

        return res.status(200).json({ likes, dislikes });

    } catch (error) {
        console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports={like,dislike,getRating}


