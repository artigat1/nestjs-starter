////// app.module.ts //////
import { Module } from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guard';
import { HelloModule } from '@/hello/hello.module';
import { HiModule } from '@/hi/hi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const AUTH_GUARD = 'unqiue-auth-guard';

@Module({
  /*this where descendent modules get added
    we've to do this if we were importing another inside
    an other module to be able to use its providers
  */
  imports: [HelloModule, HiModule],
  controllers: [AppController],
  providers: [AppService, { provide: AUTH_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
