/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SetMetadata } from '@nestjs/common';

export const Target = (...target: string[]) => SetMetadata('target', target);
