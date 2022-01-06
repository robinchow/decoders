// @flow strict

import { annotate } from '../annotate';
import { define } from '../_decoder';
import { err, ok } from '../result';
import type { Decoder } from '../_decoder';

const anyNumber: Decoder<number> = define((blob) =>
    typeof blob === 'number' && !Number.isNaN(blob)
        ? ok(blob)
        : err(annotate(blob, 'Must be number')),
);

/**
 * Accepts finite numbers (can be integer or float values). Values `NaN`,
 * or positive and negative `Infinity` will get rejected.
 */
export const number: Decoder<number> = anyNumber.and(
    (n) => Number.isFinite(n),
    'Number must be finite',
);

/**
 * Accepts only finite whole numbers.
 */
export const integer: Decoder<number> = number.and(
    (n) => Number.isInteger(n),
    'Number must be an integer',
);

/**
 * Accepts only positive finite numbers.
 */
export const positiveNumber: Decoder<number> = number.and(
    (n) => n >= 0,
    'Number must be positive',
);

/**
 * Accepts only positive finite whole numbers.
 */
export const positiveInteger: Decoder<number> = integer.and(
    (n) => n >= 0,
    'Number must be positive',
);