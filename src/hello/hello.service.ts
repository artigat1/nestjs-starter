////// hello.service.ts ///////

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { HiService } from '@/hi/hi.service';
import { ByeService } from './bye.service';

@Injectable()
export class HelloService {
  db: { id: string; message: string }[] = [];

  constructor(
    @Inject(forwardRef(() => HiService))
    private hiService: HiService,
    @Inject(forwardRef(() => ByeService))
    private byeService: ByeService,
  ) {}

  async findById(id: string) {
    return this.db.find((hello) => hello.id === id);
  }

  async create(message: string) {
    const id = uuid();
    const hello = { id, message };
    this.db.push(hello);
    return hello;
  }

  async getAll() {
    return this.db;
  }

  async deleteById(id: string) {
    this.db = this.db.filter((hello) => hello.id !== id);
    return `DELETED node ${id} from db`;
  }

  getHello(arg: string) {
    return `hello for ${arg}`;
  }

  // a method that uses `hiService`
  hiServiceUsingMethod() {
    return this.hiService.getHi('hello');
  }

  byeServiceUsingMethod() {
    return this.byeService.getBye('hello');
  }
}
