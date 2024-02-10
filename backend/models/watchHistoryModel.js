const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const watchHistorySchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    contentId: {
      type: String,
      required: true,
    },
    contentTitle: {
      type: String,
      required: true,
    },
    contentPoster: {
      type: String,
      required: true,
    },
    contentType:{
      type: String,
      required: true,
    },
    contentRating:{
      type: Number,
      required: true,
    }
  }, {
    timestamps: true,
  });
  
  module.exports = mongoose.model('WatchHistory', watchHistorySchema);