import { model, Schema } from "mongoose";
import { ILink, ILinkDocument, ILinkModel } from "./interfaces";

const linkSchema: Schema<ILinkDocument> = new Schema(
  {
    link: {
      type: String,
      require: true,
      readonly: true
    }
  },
  {
    collection: "Links"
  }
)

const Link = model<ILinkDocument, ILinkModel>("links", linkSchema);

linkSchema.statics.buildLink = (args: ILink) => {
  return new Link(args);
}

export default Link;