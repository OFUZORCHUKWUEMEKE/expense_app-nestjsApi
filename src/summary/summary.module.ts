import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { ReportModule } from 'src/report/report.module';

@Module({
    imports: [ReportModule],
    providers: [SummaryService],
    controllers: [SummaryController]
})
export class SummaryModule { }
