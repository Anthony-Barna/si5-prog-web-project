import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { SalesPoint } from "../entity/sales-point.entity";
import { parser } from "../util/xml-parser.util";
import { Service } from "../entity/service.entity";
import { Price } from "../entity/price.entity";
import * as moment from "moment";
import { Position } from "../entity/position.entity";
import { Address } from "../entity/address.entity";
import { Timetable } from "../entity/timetable.entity";
import { FormatterUtil } from "../util/formatterUtil";

@Injectable()
export class SalesPointService {
  constructor(
    @InjectRepository(SalesPoint)
    private readonly salesPointRepository: MongoRepository<SalesPoint>
  ) {}

  async findAll(
    fuel: string,
    price: number,
    longitude: number,
    latitude: number,
    distance: number,
    road: string,
    limit: number
  ): Promise<SalesPoint[]> {
    let where = {};

    if (road) {
      where["presence"] = road;
    }

    if (distance) {
      where["position"] = {
        $near: {
          $geometry: { type: "Point", coordinates: [+longitude, +latitude] },
          $maxDistance: +distance,
        },
      };
    }

    return this.salesPointRepository.find({
      where: where,
      take: limit ? Math.round(limit) : 0,
    });
  }

  // Must be called before sorting by position
  async indexPositions(): Promise<void> {
    await this.salesPointRepository.createCollectionIndex({
      position: "2dsphere",
    });
  }

  async persistSalesPoints(salesPointsString: string): Promise<void> {
    const salesPointsObject = parser.parse(salesPointsString).pdv_liste.pdv;
    let salesPoints: SalesPoint[] = [];

    salesPointsObject.forEach((salesPointObject) =>
      salesPoints.push(this.createSalesPoint(salesPointObject))
    );

    for (const salesPoint of salesPoints) {
      const persistedSalesPoint = await this.salesPointRepository.save(
        salesPoint
      );
      Logger.log("Sales point created : n°" + persistedSalesPoint.id);
    }
  }

  private createSalesPoint(salesPointObject: any): SalesPoint {
    let salesPoint: SalesPoint = new SalesPoint();
    salesPoint.rupture = salesPointObject.rupture;
    salesPoint.presence = salesPointObject.pop;
    salesPoint.hasAutomate =
      salesPointObject.horaires?.["automate-24-24"] === "1";

    this.createSalesPointAddress(salesPointObject, salesPoint);
    this.createSalesPointPosition(salesPointObject, salesPoint);
    this.createSalesPointServices(salesPointObject, salesPoint);
    this.createSalesPointTimetables(salesPointObject, salesPoint);
    this.createSalesPointPrices(salesPointObject, salesPoint);

    return salesPoint;
  }

  private createSalesPointAddress(
    salesPointObject: any,
    salesPoint: SalesPoint
  ): void {
    salesPoint.address = new Address();
    salesPoint.address.street = salesPointObject.adresse;
    salesPoint.address.city = salesPointObject.ville;
    salesPoint.address.postalCode = salesPointObject.cp;
  }

  private createSalesPointPosition(
    salesPointObject: any,
    salesPoint: SalesPoint
  ): void {
    salesPoint.position = new Position();
    salesPoint.position.coordinates.push(
      FormatterUtil.formatLongitude(+salesPointObject.longitude)
    );
    salesPoint.position.coordinates.push(
      FormatterUtil.formatLatitude(+salesPointObject.latitude)
    );
  }

  private createSalesPointServices(
    salesPointObject: any,
    salesPoint: SalesPoint
  ): void {
    salesPoint.services = [];

    if (salesPointObject.services.service) {
      Array.prototype.forEach.call(
        salesPointObject.services.service,
        (serviceName) => {
          let service = new Service();
          service.name = serviceName;
          salesPoint.services.push(service);
        }
      );
    }
  }

  private createSalesPointTimetables(
    salesPointObject: any,
    salesPoint: SalesPoint
  ): void {
    salesPoint.timetables = [];

    if (salesPointObject.horaires?.jour) {
      salesPointObject.horaires.jour.forEach((t) => {
        let timetable: Timetable = new Timetable();
        timetable.id = t.id;
        timetable.name = t.nom;
        timetable.closed = t.ferme === "1";
        salesPoint.timetables.push(timetable);
      });
    }
  }

  private createSalesPointPrices(
    salesPointObject: any,
    salesPoint: SalesPoint
  ): void {
    salesPoint.prices = [];

    if (salesPointObject.prix) {
      if (Array.isArray(salesPointObject.prix)) {
        salesPointObject.prix.forEach((p) => {
          let price = new Price();
          price.id = p.id;
          price.name = p.nom;
          price.value = +p.valeur;
          price.lastUpdateDate = moment(p.maj, "YYYY-MM-DD HH:mm:ss").toDate();
          salesPoint.prices.push(price);
        });
      } else {
        let price = new Price();
        price.id = salesPointObject.prix.id;
        price.name = salesPointObject.prix.nom;
        price.value = +salesPointObject.prix.valeur;
        price.lastUpdateDate = moment(
          salesPointObject.prix.maj,
          "YYYY-MM-DD HH:mm:ss"
        ).toDate();
        salesPoint.prices.push(price);
      }
    }
  }
}
