import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SalesPoint } from "../entity/sales-point.entity";
import { parser } from "../util/xml-parser.util";
import { Service } from "../entity/service.entity";
import { Logger } from "@nestjs/common";
import { Price } from "../entity/price.entity";
import * as moment from "moment";

@Injectable()
export class SalesPointService {
  constructor(
    @InjectRepository(SalesPoint)
    private readonly salesPointRepository: Repository<SalesPoint>
  ) {}

  async findAll(): Promise<SalesPoint[]> {
    return this.salesPointRepository.find();
  }

  async persistSalesPoints(salesPointsString: string): Promise<SalesPoint[]> {
    const salesPointsObject = parser.parse(salesPointsString).pdv_liste.pdv;
    let salesPoints: SalesPoint[] = [];
    let persistedSalesPoints: SalesPoint[] = [];

    salesPointsObject.forEach((salesPointObject) =>
      salesPoints.push(this.createSalesPoint(salesPointObject))
    );

    for (const salesPoint of salesPoints) {
      const persistedSalesPoint = await this.salesPointRepository.save(
        salesPoint
      );
      persistedSalesPoints.push(persistedSalesPoint);
      Logger.log("Sales point created : n°" + persistedSalesPoint.id);
    }

    return persistedSalesPoints;
  }

  private createSalesPoint(salesPointObject: any): SalesPoint {
    let salesPoint: SalesPoint = new SalesPoint();
    salesPoint.address = salesPointObject.adresse;
    salesPoint.city = salesPointObject.ville;
    salesPoint.opening = salesPointObject.ouverture;
    salesPoint.closing = salesPointObject.fermeture;
    salesPoint.rupture = salesPointObject.rupture;

    this.createSalesPointServices(salesPointObject, salesPoint);
    this.createSalesPointPrices(salesPointObject, salesPoint);

    return salesPoint;
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

  private createSalesPointPrices(
    salesPointObject: any,
    salesPoint: SalesPoint
  ): void {
    salesPoint.prices = [];

    if (salesPointObject.prix) {
      salesPointObject.prix.forEach((p) => {
        let price = new Price();
        price.id = p.id;
        price.name = p.nom;
        price.value = +p.valeur;
        price.lastUpdateDate = moment(p.maj, "YYYY-MM-DD HH:mm:ss").toDate();
        salesPoint.prices.push(price);
      });
    }
  }
}
