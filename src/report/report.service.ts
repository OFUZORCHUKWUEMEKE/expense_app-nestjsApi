import { Injectable } from '@nestjs/common';
import { ReportType, data } from '../data';
import { v4 as uuid } from 'uuid'
import { ReportResponseDto } from '../dto/report.dto';

interface Report{
    amount:number;
    source:string;
  }
  
  interface UpdateReport{
    amount?:number;
    source?:string;
  }

@Injectable()
export class ReportService {
    getAllReports(type: string):ReportResponseDto[] {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        return data.report.filter((report) => report.type === reportType).map((report)=> new ReportResponseDto(report))
      }
    
      getReportsByID(type: string, id: string):ReportResponseDto {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        const report = data.report.filter((report) => report.type === reportType).find((report) => report.id === id)
    
        if(!report){}
        return new ReportResponseDto(report)
      }
    
      addNewReport(type: string, amount: number, source: string):ReportResponseDto {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
        const newData = {
          amount,
          source,
          created_at: new Date(),
          updated_at: new Date(),
          id: uuid(),
          type: reportType
        }
         data.report.push(newData)
        return new ReportResponseDto(newData)
      }
    
      editReport(type: string, id: string, body:UpdateReport):ReportResponseDto {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    
        const reportToUpdate = data.report.filter((report) => report.type === reportType).find((report) => report.id === id)
    
        if (!reportToUpdate) return;
    
        const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id)
    
        data.report[reportIndex] = {
          ...data.report[reportIndex],
          ...body
        }
    
        data.report[reportIndex]
    
        return new ReportResponseDto(reportToUpdate)
      }
    
      deleteReport(id: string):string {
        const reportIndex = data.report.findIndex((report) => report.id === id)
        if (reportIndex === -1) return;
    
        data.report.splice(reportIndex, 1)
    
        return 'successfully deleted'
      }
}
