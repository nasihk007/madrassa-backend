import { ApiProperty } from '@nestjs/swagger';

export class DataResponseDto {
  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty()
  readonly status: boolean;

  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly data: any;

  @ApiProperty()
  readonly meta: any;

  readonly token?: string;
  readonly refreshToken?: string;

  constructor(data: any, status: boolean, message: string, meta?: any) {
    this.statusCode = status ? 200 : 400;
    this.status = status;
    this.message = message;
    this.data = status ? data : null;
    this.meta = meta || null;
  }
}
