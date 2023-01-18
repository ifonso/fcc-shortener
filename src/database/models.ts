import { model, Schema } from "mongoose";
import { ILink, ILinkDocument, ILinkModel } from "./interfaces";

const linkSchema: Schema<ILinkDocument> = new Schema(
  {
    link: {
      type: String,
      require: true,
      readonly: true
    },
    short: {
      type: Number,
      require: true,
      default: 1000
    }
  },
  {
    collection: "Links"
  }
)

linkSchema.pre("save", async function(next) {
  const doc = this;
  const count = await Link.countDocuments();

  doc.short = count;
  next();
})

const Link = model<ILinkDocument, ILinkModel>("links", linkSchema);

export default Link;