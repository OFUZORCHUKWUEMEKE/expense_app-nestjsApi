import { Controller, Get, Param, ParseIntPipe, Put, Post, Delete, Body, HttpCode, HttpStatus ,ParseUUIDPipe,ParseEnumPipe} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from 'src/dto/report.dto';
import { ReportType } from 'src/data';

@Controller('report/:type')
export class ReportController {
    constructor(private readonly reportService:ReportService){}


    @Get()
    getIncomeReport(@Param('type' ,new ParseEnumPipe(ReportType)) type: string):ReportResponseDto[] {
      return this.reportService.getAllReports(type)
    }
  
    @Get(':id')
    getIncomeReportByID(@Param('id', ParseUUIDPipe) id: string, @Param('type',new ParseEnumPipe(ReportType)) type: string):ReportResponseDto {
      return this.reportService.getReportsByID(type, id)
    }
  
    @HttpCode(HttpStatus.CREATED)
    @Post('')
    addIncomeExpense(@Body() {amount,source}:CreateReportDto, @Param('type',new ParseEnumPipe(ReportType)) type: string):ReportResponseDto {
      return this.reportService.addNewReport(type, amount, source)
    }
  
    @Put(':id')
    editIncomeExpense(@Param('id',ParseUUIDPipe) id: string, @Param('type',new ParseEnumPipe(ReportType)) type: string, @Body() body: UpdateReportDto) :ReportResponseDto{
      return this.reportService.editReport(type, id, body)
    }
  
    @HttpCode(HttpStatus.GONE)
    @Delete(':id')
    deleteIncomeExpense(@Param('id',ParseUUIDPipe) id:string) {
       this.reportService.deleteReport(id)
    }
}
