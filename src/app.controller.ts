import { Controller, Get, Param, ParseIntPipe, Put, Post, Delete, Body, HttpCode, HttpStatus ,ParseUUIDPipe,ParseEnumPipe} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid'
import { CreateReportDto, UpdateReportDto } from './dto/report.dto';
// import { type } from 'os';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getIncomeReport(@Param('type' ,new ParseEnumPipe(ReportType)) type: string) {
    return this.appService.getAllReports(type)
  }

  @Get(':id')
  getIncomeReportByID(@Param('id', ParseUUIDPipe) id: string, @Param('type',new ParseEnumPipe(ReportType)) type: string) {
    return this.appService.getReportsByID(type, id)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  addIncomeExpense(@Body() {amount,source}:CreateReportDto, @Param('type',new ParseEnumPipe(ReportType)) type: string) {
    return this.appService.addNewReport(type, amount, source)
  }

  @Put(':id')
  editIncomeExpense(@Param('id',ParseUUIDPipe) id: string, @Param('type',new ParseEnumPipe(ReportType)) type: string, @Body() body: UpdateReportDto) {
    return this.appService.editReport(type, id, body)
  }

  @HttpCode(HttpStatus.GONE)
  @Delete(':id')
  deleteIncomeExpense(@Param('id',ParseUUIDPipe) id:string) {
     this.appService.deleteReport(id)
  }
}
