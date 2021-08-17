import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { HelloService } from '@/hello/hello.service';

@Injectable()
export class HiService {
  constructor(
    @Inject(forwardRef(() => HelloService))
    private helloService: HelloService,
  ) {}

  getHi(arg: string) {
    return `hi for ${arg}`;
  }

  // a method that uses `helloService`
  helloServiceUsingMethod() {
    return this.helloService.getHello('hi');
  }
}
