import { forwardRef, Module } from '@nestjs/common';
import { HiService } from './hi.service';
import { HiController } from './hi.controller';
import { HelloModule } from '@/hello/hello.module';

@Module({
  imports: [forwardRef(() => HelloModule)],
  providers: [HiService],
  controllers: [HiController],
  exports: [HiService],
})
export class HiModule {}
