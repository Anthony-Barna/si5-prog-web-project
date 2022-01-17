import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('/api/photo')
@Controller('/api/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  @ApiOperation({ summary: 'Read photos' })
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }
}
