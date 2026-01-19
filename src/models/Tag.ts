import { Schema, model } from "mongoose";

const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
});

const Tag = model("Tag", TagSchema);
export default Tag;
