// we fixed and improved typings of some external packages here
import 'go-network-framework/lib/types/external'

// TODO: framework assumes fetch is there
// we probably should handle server support a bit more graceful
(global as any).fetch = require('node-fetch')

import * as util from 'ethereumjs-util'
import * as gonetwork from 'go-network-framework'

const world = 'WORLD!'

export function hello (word: string = world): string {
  return `Hello ${world}! `
}

// TODO: remove it - it is here just to show that all should work fine
import './monitoring-test'

// TODO: choose yarn vs npm and stick to one across projects
