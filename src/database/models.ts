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

export default Link;