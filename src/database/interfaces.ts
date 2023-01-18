import { Document, Model } from "mongoose";

export interface ILink {
  link: string;
  short: number
}

export interface ILinkDocument extends ILink, Document {};

export interface ILinkModel extends ILink, Model<ILinkDocument> {};