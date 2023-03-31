import { Injectable } from '@nestjs/common';

//API Call setup for api/health endpoint
@Injectable()
export class AppService {
  health() {
    return {
      status: 'OK',
    };
  }
}
