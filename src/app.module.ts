////// app.module.ts //////
import { Module } from '@nestjs/common';

import { HelloModule } from './hello/hello.module';

@Module({
  /*this where descendent modules get added
			we've to do this if we were importing another inside
			an other module to be able to use its providers
     */
  imports: [HelloModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
