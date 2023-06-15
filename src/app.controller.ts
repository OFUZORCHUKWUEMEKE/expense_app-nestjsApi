import { Controller, Get, Param, ParseIntPipe, Put, Post, Delete, Body, HttpCode, HttpStatus ,ParseUUIDPipe,ParseEnumPipe} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid'
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from './dto/report.dto';
// import { type } from 'os';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }

}
