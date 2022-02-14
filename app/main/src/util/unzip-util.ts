const request = require("request");

const unzipper = require("unzipper");

export class UnzipUtil {
  public readonly GAS_PRICE_UI_URL: string = "https://donnees.roulez-eco.fr/opendata/instantane";

  constructor() {}

  public async getUncompressedGasPriceString(): Promise<string> {
    const directory = await unzipper.Open.url(request, this.GAS_PRICE_UI_URL);
    const file = directory.files[0];
    const content = await file.buffer();
    return content.toString();
  }
}
