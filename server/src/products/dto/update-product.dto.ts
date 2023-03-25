import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({ example: 1234, required: false})
    productId: number;

    @ApiProperty({ example: 'ProductName', type: 'string', required: false })
    productName: string;

    @ApiProperty({ example: 'ProductOwnerName', type: 'string',required: false })
    productOwnerName: string;

    @ApiProperty({ example: '[Dev1, Dev2, Dev3]', type: 'string', isArray: true, required: false })
    Developers: string[];

    @ApiProperty({ example: 'ScrumMasterName', required: false })
    scrumMasterName: string;

    @ApiProperty({ example: 'YYYY/MM/DD', required: false })
    startDate: string;

    @ApiProperty({ example: 'Agile|Waterfall', required: false })
    methodology: string;
}
