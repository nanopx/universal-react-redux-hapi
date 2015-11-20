import {
  COUNTER_COUNT_UP,
  COUNTER_COUNT_DOWN,
  COUNTER_COUNT_RESET,
} from '../constants/counter';

export function countUp() {
  return {
    type: COUNTER_COUNT_UP,
  };
}

export function countDown() {
  return {
    type: COUNTER_COUNT_DOWN,
  };
}

export function countReset() {
  return {
    type: COUNTER_COUNT_RESET,
  };
}
