import { Request, Response } from "express";
import Link from "./database/models";

interface IShortenerRequest {
  url: string
}

interface IUrlRequest<T> extends Request {
  body: T;
}

class Controller {
  static httpUrlValidarot(url: string): Boolean {
    try {
      let givenURL = new URL(url);
      return givenURL.protocol === "http:" || givenURL.protocol === "https:";
    } catch (err) {
      return false;
    }
  }

  async shortUrl(request: IUrlRequest<IShortenerRequest>, response: Response) {
    const { url } = request.body;

    // Check URL
    if (!Controller.httpUrlValidarot(url)) {
      return response.json({
        error: "invalid url"
      })
    }

    const queryLink = await Link.findOne({ link: url });

    // Se encontrar um link
    if (queryLink) {
      return response.json({
        original_url: queryLink.link,
        short_url: queryLink.short
      })
    }

    // Se não encontrar
    const newLink = new Link({ link: url });

    await newLink
    .save()
    .then( link => {
      return response.json({
        original_url: link.link,
        short_url: link.short
      })
    })
    .catch( _ => {
      return response.json({
        error: "invalid url"
      })
    })
  }

  async findLink(request: Request, response: Response) {
    const { id } = request.params;

    const queryLink = await Link.findOne({ short: id });

    if (queryLink) {
      return response.redirect(302, queryLink.link)
    }

    return response.json({
      error: "invalid url"
    })
  }
}

export default new Controller();