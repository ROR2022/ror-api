import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
//import { Role } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    //eslint-disable-next-line
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //console.log('RolesGuard Role:', Role);
    //console.log('RolesGuard context:', context.getHandler());
    const roles = this.reflector.get('roles', context.getHandler());
    //console.log('RolesGuard role:', role);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }

  matchRoles(roles: string[], userRole: string): boolean {
    //console.log('Comparando roles:', role, userRole);
    return roles.includes(userRole);
  }
}