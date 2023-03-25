import { Injectable } from '@nestjs/common';

export type HealthResponse = {
  status: string;
};

@Injectable()
export class AppService {
  health(): HealthResponse {
    return {
      status: 'OK',
    };
  }
}
