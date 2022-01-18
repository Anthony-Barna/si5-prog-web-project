import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesPoint } from '../entity/sales-point.entity';
import {XMLParser} from "fast-xml-parser";

@Injectable()
export class SalesPointService {
  constructor(
    @InjectRepository(SalesPoint)
    private readonly photoRepository: Repository<SalesPoint>,
  ) {}

  async findAll(): Promise<SalesPoint[]> {
    return this.photoRepository.find();
  }

  async createSalesPoints(salesPointsString: string): Promise<SalesPoint[]> {
    const parser = new XMLParser();
    const salesPointsObject = parser.parse(salesPointsString).pdv_liste.pdv;
    let salesPoints: SalesPoint[] = [];
    let persistedSalesPoints: SalesPoint[] = [];

    salesPointsObject.forEach(salesPointObject => salesPoints.push(this.createSalesPoint(salesPointObject)));

    for (const salesPoint of salesPoints) {
      persistedSalesPoints.push(await this.photoRepository.save(salesPoint));
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

    return salesPoint;
  }
}
