import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid'

interface Report{
  amount:number;
  source:string;
}

interface UpdateReport{
  amount?:number;
  source?:string;
}

@Injectable()
export class AppService {
  getAllReports(type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter((report) => report.type === reportType)
  }

  getReportsByID(type: string, id: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter((report) => report.type === reportType).find((report) => report.id === id)
  }

  addNewReport(type: string, amount: number, source: string) {
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

  editReport(type: string, id: string, body:UpdateReport) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportToUpdate = data.report.filter((report) => report.type === reportType).find((report) => report.id === id)

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body
    }

    data.report[reportIndex]
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id)
    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1)

    return 'successfully deleted'
  }
}
