////// hello.module.ts //////
import { forwardRef, Module } from '@nestjs/common';

import { HelloService } from './hello.service';
import { HelloController } from './hello.controller';
import { ByeService } from './bye.service';
import { HiModule } from '@/hi/hi.module';

@Module({
  imports: [forwardRef(() => HiModule)],
  /* put all providers that is under this module graph to help Nest to
		 inject those in the controllers
  */
  providers: [HelloService, ByeService],
  /* put controllers here for letting Nest recognize all the route/path &
     their handlers
	*/
  controllers: [HelloController],
  /*put those providers which you wanna use outside of this module
    In an outside module when HelloModule gets imported
  */
  exports: [HelloService],
})
export class HelloModule {}
