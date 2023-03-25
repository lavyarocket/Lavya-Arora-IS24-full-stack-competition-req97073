import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 1234, required: true})
    productId: number;

    @ApiProperty({ example: 'ProductName', type: 'string', required: true })
    productName: string;

    @ApiProperty({ example: 'ProductOwnerName', type: 'string', required: true })
    productOwnerName: string;

    @ApiProperty({ example: '[Dev1, Dev2, Dev3]', type: 'string', isArray: true, required: true })
    Developers: string[];

    @ApiProperty({ example: 'ScrumMasterName', required: true })
    scrumMasterName: string;

    @ApiProperty({ example: 'YYYY/MM/DD', required: true })
    startDate: string;

    @ApiProperty({ example: 'Agile|Waterfall', required: true })
    methodology: string;

}