import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { HelloService } from './hello.service';

@Injectable()
export class ByeService {
  constructor(
    @Inject(forwardRef(() => HelloService))
    private helloService: HelloService,
  ) {}

  getBye(arg: string) {
    return `bye bye, ${arg}`;
  }

  helloServiceUsingMethod() {
    return this.helloService.getHello('bye');
  }
}
