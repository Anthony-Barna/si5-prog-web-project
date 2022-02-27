import {Logger} from "@nestjs/common";

const request = require("request");

const unzipper = require("unzipper");

export class UnzipUtil {
  public readonly GAS_PRICE_UI_URL: string = "https://donnees.roulez-eco.fr/opendata/instantane";

  constructor() {}

  public async getUncompressedGasPriceString(): Promise<string> {
    try {
      const directory = await unzipper.Open.url(request, this.GAS_PRICE_UI_URL);
      const file = directory.files[0];
      const content = await file.buffer()

      Logger.error("File upload success");

      return content.toString("latin1")
    }
    catch (e) {
      Logger.error("File downland from government api failed");
      return undefined;
    }
  }
}
