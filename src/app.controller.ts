import { Controller, Get, Param, ParseIntPipe, Put, Post, Delete, Body ,HttpCode,HttpStatus} from '@nestjs/common';
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
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter((report) => report.type === reportType)

  }

  @Get(':id')
  getIncomeReportByID(@Param('id', ParseIntPipe) id: string, @Param('type', ParseIntPipe) type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter((report) => report.type === reportType).find((report) => report.id === id)
  }
  
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  addIncomeExpense(@Body() { amount, source }: { amount: number, source: string }, @Param('type') type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    const newData = {
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      id: uuid(),
      type: reportType
    }
    // const newReport = data.report.push(newData)
    return newData
  }

  @Put(':id')
  editIncomeExpense(@Param('id') id: string,@Param('type') type: string,@Body() body:{amount: number, source: string}){
    const reportType = type==='income'?ReportType.INCOME:ReportType.EXPENSE;

    const reportToUpdate = data.report.filter((report)=>report.type===reportType).find((report)=>report.id===id)

    if(!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report)=>report.id===reportToUpdate.id)

    data.report[reportIndex] ={
      ...data.report[reportIndex],
      ...body
    }

    data.report[reportIndex]
    
  }


  @HttpCode(HttpStatus.GONE)
  @Delete(':id')
  deleteIncomeExpense(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report)=>report.id===id)
    if(reportIndex === -1) return;

    data.report.splice(reportIndex,1)

    return 'successfully deleted'
  }
}
