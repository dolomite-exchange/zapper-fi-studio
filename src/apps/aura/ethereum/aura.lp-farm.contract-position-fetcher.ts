import { range } from 'lodash';

import { PositionTemplate } from '~app-toolkit/decorators/position-template.decorator';

import { AuraFarmContractPositionFetcher } from '../common/aura.farm.contract-position-fetcher';

@PositionTemplate()
export class EthereumAuraLpFarmContractPositionFetcher extends AuraFarmContractPositionFetcher {
  groupLabel = 'Liquidity Pool Staking';

  BOOSTER_V1_ADDRESS = '0x7818a1da7bd1e64c199029e86ba244a9798eee10';
  BOOSTER_V2_ADDRESS = '0xa57b8d98dae62b26ec3bcc4a365338157060b234';

  async getFarmAddresses() {
    const boosters = [this.BOOSTER_V1_ADDRESS, this.BOOSTER_V2_ADDRESS].map(booster =>
      this.contractFactory.auraBooster({ address: booster, network: this.network }),
    );

    const addresses = await Promise.all(
      boosters.map(async contract => {
        const numPools = await contract.poolLength().then(Number);
        return Promise.all(range(0, numPools).map(v => contract.poolInfo(v).then(p => p.crvRewards)));
      }),
    );

    return addresses.flat();
  }
}
