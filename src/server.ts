import * as util from 'ethereumjs-util'
import * as gonetwork from 'go-network-framework'

const world = 'WORLD';

export function hello(word: string = world): string {
  return `Hello ${world}! `;
}
