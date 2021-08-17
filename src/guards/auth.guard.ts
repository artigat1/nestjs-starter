////// auth.guard.ts /////

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '@/decorators/public.decorators';

function validateToken(token: string): boolean {
  return token === 'ste-jwt-token';
}

@Injectable()
export class AuthGuard implements CanActivate {
  logger: Logger = new Logger(AuthGuard.name);

  // just add the Reflector as a type
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('AUTH_GUARD');
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) return true;

      // gives access to the express/fastify request object
      const request = context.switchToHttp().getRequest();
      // jwt/any kind of token
      const token = request?.headers?.['authorization']?.split(' ')[1];
      if (!token) return false; // no token no entry

      return validateToken(token);
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
