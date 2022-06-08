import { Register } from '~app-toolkit/decorators';
import { appDefinition, AppDefinition } from '~app/app.definition';
import { AppAction, AppTag, GroupType } from '~app/app.interface';
import { Network } from '~types/network.interface';

export const TEMPUS_DEFINITION = appDefinition({
  id: 'tempus',
  name: 'Tempus Finance',
  description:
    'Tempus is a multi-chain fixed-income protocol that integrates with lending protocols, staking protocols, and yield aggregators, and lets users fix or speculate on the yield generated by them.',
  url: 'https://tempus.finance/',

  groups: {
    pool: {
      id: 'pool',
      type: GroupType.TOKEN,
      label: 'P-Y Tokens',
    },

    amm: {
      id: 'amm',
      type: GroupType.TOKEN,
      label: 'AMM Liquidity',
    },
  },

  tags: [AppTag.CROSS_CHAIN, AppTag.YIELD_AGGREGATOR],
  keywords: [],
  links: {},

  supportedNetworks: {
    [Network.ETHEREUM_MAINNET]: [AppAction.VIEW],
    [Network.FANTOM_OPERA_MAINNET]: [AppAction.VIEW],
  },

  primaryColor: '#fff',
});

@Register.AppDefinition(TEMPUS_DEFINITION.id)
export class TempusAppDefinition extends AppDefinition {
  constructor() {
    super(TEMPUS_DEFINITION);
  }
}

export default TEMPUS_DEFINITION;
