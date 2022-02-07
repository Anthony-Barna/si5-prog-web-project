export class FormatterUtil {
  private static readonly FRANCE_MIN_LONGITUDE = -10;
  private static readonly FRANCE_MAX_LONGITUDE = 10;
  private static readonly FRANCE_MIN_LATITUDE = 40;
  private static readonly FRANCE_MAX_LATITUDE = 55;

  public static formatLongitude(longitude: number): number {
    while (longitude < this.FRANCE_MIN_LONGITUDE) {
      if (longitude < 0) {
        longitude /= 10;
      }
      if (longitude > 0) {
        longitude *= 10;
      }
    }
    while (longitude > this.FRANCE_MAX_LONGITUDE) {
      if (longitude > 0) {
        longitude /= 10;
      }
      if (longitude < 0) {
        longitude *= 10;
      }
    }
    return longitude;
  }

  public static formatLatitude(latitude: number): number {
    while (latitude < this.FRANCE_MIN_LATITUDE) {
      if (latitude < 0) {
        latitude /= 10;
      }
      if (latitude > 0) {
        latitude *= 10;
      }
    }
    while (latitude > this.FRANCE_MAX_LATITUDE) {
      if (latitude > 0) {
        latitude /= 10;
      }
      if (latitude < 0) {
        latitude *= 10;
      }
    }
    return latitude;
  }
}
