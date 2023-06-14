import { Controller, Get,Param ,ParseIntPipe,Put,Post,Delete,Body} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('income/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIncomeReport(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  getIncomeReportByID(@Param('id' ,ParseIntPipe) id: number){
      return id
  }

  @Put(':id')
  editIncomeExpense(@Param('id') id:number):number{
    return id
  }
  @Post(':id')
  addIncomeExpense(@Body() name:string){
    return name
  }
  @Delete(':id')
  deleteIncomeExpense(@Param('id') id:number ){
      return id
  }
}
