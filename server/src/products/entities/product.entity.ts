import { ApiProperty } from '@nestjs/swagger';

export class Product {
    productId: number;

    @ApiProperty({ example: 'Your Product Name' })
    productName: string;

    @ApiProperty({ example: 'Product Owner Name' })
    productOwnerName: string;

    @ApiProperty({ example: 'List of Developers (Upto 5)' })
    Developers: string[];

    @ApiProperty({ example: 'ScrumMaster of Product' })
    scrumMasterName: string;

    @ApiProperty({ example: 'Start Date in YYYY/MM/DD' })
    startDate: string;

    @ApiProperty({ example: 'Methodology (Agile or Waterfall)' })
    methodology: string;
}
