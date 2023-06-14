import { Controller, Get, Param, ParseIntPipe, Put, Post, Delete, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid'
// import { type } from 'os';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getIncomeReport(@Param('type') type: string) {
    return this.appService.getAllReports(type)
  }

  @Get(':id')
  getIncomeReportByID(@Param('id', ParseIntPipe) id: string, @Param('type', ParseIntPipe) type: string) {
    return this.appService.getReportsByID(type, id)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  addIncomeExpense(@Body() { amount, source }: { amount: number, source: string }, @Param('type') type: string) {
    return this.appService.addNewReport(type, amount, source)
  }

  @Put(':id')
  editIncomeExpense(@Param('id') id: string, @Param('type') type: string, @Body() body: { amount: number, source: string }) {
    return this.appService.editReport(type, id, body)
  }

  @HttpCode(HttpStatus.GONE)
  @Delete(':id')
  deleteIncomeExpense(@Param('id') id: string) {
   
  }
}
