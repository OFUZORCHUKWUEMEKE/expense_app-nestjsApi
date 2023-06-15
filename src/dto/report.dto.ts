import { IsNumber, IsPositive, IsString ,IsOptional,IsNotEmpty} from "class-validator";


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