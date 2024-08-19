import { createStarknetNetwork } from './starknet';
import { createEvmNetwork } from './evm';
import type { NetworkID } from '@/types';
import type { ReadWriteNetwork } from './types';


const starknetNetwork = createStarknetNetwork('sn');
const starknetSepoliaNetwork = createStarknetNetwork('sn-sep');
const ethereumNetwork = createEvmNetwork('eth');
const sepoliaNetwork = createEvmNetwork('sep');

export const enabledNetworks: NetworkID[] = import.meta.env.VITE_ENABLED_NETWORKS
  ? (import.meta.env.VITE_ENABLED_NETWORKS.split(',') as NetworkID[])
  : ['eth', 'sep', 'sn', 'sn-sep'];

export const evmNetworks: NetworkID[] = [
  'eth',
  'sep',
];

export const getNetwork = (id: NetworkID) => {
  if (!enabledNetworks.includes(id)) throw new Error(`Network ${id} is not enabled`);

  if (id === 'eth') return ethereumNetwork;
  if (id === 'sep') return sepoliaNetwork;
  if (id === 'sn') return starknetNetwork;
  if (id === 'sn-sep') return starknetSepoliaNetwork;

  throw new Error(`Unknown network ${id}`);
};

export const getReadWriteNetwork = (id: NetworkID): ReadWriteNetwork => {
  const network = getNetwork(id);
  if (network.readOnly) throw new Error(`Network ${id} is read-only`);

  return network;
};

export const enabledReadWriteNetworks: NetworkID[] = enabledNetworks.filter(
  id => !getNetwork(id).readOnly
);

/**
 * supportsNullCurrent return true if the network supports null current to be used for computing current voting power
 * @param networkId Network ID
 * @returns boolean true if the network supports null current
 */
export const supportsNullCurrent = (networkID: NetworkID) => {
  return !evmNetworks.includes(networkID);
};