import { Controller, Get } from '@nestjs/common';
import { ReportService } from 'src/report/report.service';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
    constructor(private readonly summaryService:SummaryService){}
   @Get()
   getAllSummary(){
    return  this.summaryService.calculateSummary()
   }
}
