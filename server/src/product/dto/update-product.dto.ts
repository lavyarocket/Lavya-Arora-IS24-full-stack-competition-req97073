import { PartialType, ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsIn, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

//Define class for Product based on Schema (Used to Update given Product Entry)
export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'ProductName', type: 'string', required: false })
    productName: string;

    @Matches(/^[a-z0-9 ]+$/i)
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'ProductOwnerName', type: 'string',required: false })
    productOwnerName: string;

    @ArrayMaxSize(5)
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    @ApiProperty({ example: '[Dev1, Dev2, Dev3]', type: 'string', isArray: true, required: false })
    Developers: string[];

    @Matches(/^[a-z0-9 ]+$/i)
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'ScrumMasterName', required: false })
    scrumMasterName: string;

    @Matches(/^\d{4}\/\d{2}\/\d{2}$/, { message: "startDate must be of the format YYYY/MM/DD" })
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'YYYY/MM/DD', required: false })
    startDate: string;

    @IsIn(['Agile', 'Waterfall'])
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'Agile|Waterfall', required: false })
    methodology: string;
}
