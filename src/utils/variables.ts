import { makeVar } from '@apollo/client';
import { Repository } from './types';
export const repositories = makeVar<Repository[]>([]);