/*
import { Reflector } from '@nestjs/core';

export const Role = Reflector.createDecorator<string>();
*/

import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: string[]) => SetMetadata('roles', roles);
