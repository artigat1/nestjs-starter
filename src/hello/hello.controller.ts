// hello.controller.ts

import {
  Controller,
  Logger,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { HelloBodyDTO } from './hello-body.dto';
import { HelloService } from "./hello.service";

@Controller('/hello')
export class HelloController {
  /* a logger from nestjs for logging error/other info */
  logger: Logger = new Logger(HelloController.name);
  
  constructor(private readonly helloService: HelloService){}

  @Get()
  async replyHello() {
    try {
      const allHellos = await this.helloService.getAll()
      return allHellos;
    } catch (error) {
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }

  @Get(':helloId') // dyanmic parameter just like express, koa-router etc...
  async replyExactHello(
    /*pass the same dynamic parameter from "hello/:helloId" in 
               @Param decorator's first to let nestjs find the parameter
               correctly
              */
    @Param('helloId') id: string,
  ) {
    try {
      /*returning the correct temp hello message*/
      const hello = await this.helloService.findById(id)
      if (!hello) {
        throw new NotFoundException('desired `hello` not found'); //404 error
      }
      return hello?.message;
    } catch (error) {
      /* will log the error & automatically send the error as response
							 with all required data
            */
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }

  // decorator name is similar to http verbs e.g. POST -> @Post
  @Post()
  async saveHello(
    /*Just pass the class as a type & the validation will be done automatically*/
    @Body() body: HelloBodyDTO,
  ) {
    try {
      return await this.helloService.create(body.message)
    } catch (error) {
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }
}
