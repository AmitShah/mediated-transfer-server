import * as Rx from 'rxjs'

import { Monitoring, infuraMonitoring } from 'go-network-framework'

const cfg = {
  NETWORK: 'ropsten',
  CHANNEL_MANAGER_ADDRESS: '0xde8a6a2445c793db9af9ab6e6eaacf880859df01',
  TOKEN_ADDRESSES: [
    '0xa28a7a43bc389064ab5d16c0338968482b4e02bd', // go-token
    '0xbed8d09854a7013af00bdae0f0969f7285c2f4d2' // test-token
  ]
}

// console.log('CONFIG', cfg, Monitoring, infuraMonitoring)

const monitoring = new Monitoring(
  Object.assign(
    infuraMonitoring(cfg.NETWORK, ''), // todo: token seems not required
    {
      channelManagerAddress: cfg.CHANNEL_MANAGER_ADDRESS,
      tokenAddresses: cfg.TOKEN_ADDRESSES,

      storage: { // no persistent storage for now
        getItem: () => Promise.resolve(null),
        setItem: () => Promise.resolve(true),
        getAllKeys: () => Promise.resolve([]),

        multiGet: () => Promise.resolve([]),
        multiSet: () => Promise.resolve(true)
      }
    })
)

Rx.Observable.fromEvent(monitoring as any, 'ChannelNew')
  // .do(x => console.log('NEW', x))
  .take(10)
  .map((ev: any) => ev.netting_channel.toString('hex'))
  .map(add => `0x${add}`)
  .concatMap(add =>
    Rx.Observable.timer(2500)
      .mapTo(add)
      .do(monitoring.subscribeAddress)
  )
  .subscribe()
