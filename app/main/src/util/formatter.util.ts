export class FormatterUtil {

  private static readonly FRANCE_MIN_LONGITUDE = -10;
  private static readonly FRANCE_MAX_LONGITUDE = 10;
  private static readonly FRANCE_MIN_LATITUDE = 40;
  private static readonly FRANCE_MAX_LATITUDE = 55;

  public static formatLongitude(longitude: number): number {
    return longitude/100000;
  }

  public static formatLatitude(latitude: number): number {
    return latitude/100000;
  }
}
