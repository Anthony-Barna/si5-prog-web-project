export class FormatterUtil {
  private static readonly FRANCE_MIN_LONGITUDE = -5;
  private static readonly FRANCE_MAX_LONGITUDE = 10;
  private static readonly FRANCE_MIN_LATITUDE = 40;
  private static readonly FRANCE_MAX_LATITUDE = 55;

  public static formatLongitude(longitude: number): number {
    while (longitude < this.FRANCE_MIN_LONGITUDE) {
      longitude *= 10;
    }
    while (longitude > this.FRANCE_MAX_LONGITUDE) {
      longitude *= -10;
    }
    return longitude;
  }

  public static formatLatitude(latitude: number): number {
    while (latitude < this.FRANCE_MIN_LATITUDE) {
      latitude *= 10;
    }
    while (latitude > this.FRANCE_MAX_LATITUDE) {
      latitude *= -10;
    }
    return latitude;
  }
}
