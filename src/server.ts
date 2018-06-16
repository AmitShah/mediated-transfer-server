// we fixed and improved typings of some external packages here
import 'go-network-framework/src/types/external'

import * as util from 'ethereumjs-util'
import * as gonetwork from 'go-network-framework'

const world = 'WORLD!'

export function hello (word: string = world): string {
  return `Hello ${world}! `
}
