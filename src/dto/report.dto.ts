import { IsNumber, IsPositive, IsString ,IsOptional,IsNotEmpty} from "class-validator";
import { ReportType } from "src/data";
import {Expose,Exclude}  from 'class-transformer'


export class CreateReportDto {
    @IsNumber()
    @IsPositive()
    amount: number;


    @IsString()
    source: string
}

export class UpdateReportDto{

    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount:number;

    @IsString()
    @IsNotEmpty()
    source:string;
}

export class ReportResponseDto{

    id:string;

    source:string;

    amount:number;

    @Exclude()
    created_at:Date;

    @Exclude()
    updated_at:Date;

    type:ReportType;

    @Expose({name:'CreatedAt'})
    transformCreatedAt(){
        return this.created_at
    }

    constructor(partial:Partial<ReportResponseDto>){
        Object.assign(this,partial);
    }
}