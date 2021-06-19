/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SetMetadata } from '@nestjs/common';

export const Operation = (...operations: string[]) =>
	SetMetadata('operation', operations);
