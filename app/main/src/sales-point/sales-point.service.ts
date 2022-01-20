import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SalesPoint } from "../entity/sales-point.entity";
import { XMLParser } from "fast-xml-parser";
import { Service } from "../entity/service.entity";
import { Logger } from "@nestjs/common";

@Injectable()
export class SalesPointService {
  constructor(
    @InjectRepository(SalesPoint)
    private readonly photoRepository: Repository<SalesPoint>
  ) {}

  async findAll(): Promise<SalesPoint[]> {
    return this.photoRepository.find();
  }

  async createSalesPoints(salesPointsString: string): Promise<SalesPoint[]> {
    const parser = new XMLParser();
    const salesPointsObject = parser.parse(salesPointsString).pdv_liste.pdv;
    let salesPoints: SalesPoint[] = [];
    let persistedSalesPoints: SalesPoint[] = [];

    salesPointsObject.forEach((salesPointObject) =>
      salesPoints.push(this.createSalesPoint(salesPointObject))
    );

    for (const salesPoint of salesPoints) {
      const persistedSalesPoint = await this.photoRepository.save(salesPoint);
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

    return salesPoint;
  }
}
