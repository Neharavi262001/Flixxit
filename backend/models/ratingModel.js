const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    contentId: {
      type: String,
      required: true,
    },
    likes: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: Number,
        default: 0,
      },
  }, {
    timestamps: true,
  });
  
  module.exports = mongoose.model('Rating', ratingSchema);