import { getChannel, ChannelProvider } from '@catalabs/catalyst-channel-lists';

export function getChannelExample() {
  const channelId = getChannel(ChannelProvider.Wormhole, '5001', '80001');
  console.log(
    `Wormhole channel from Mantle Testnet to Mumbai Testnet: ${channelId}`,
  );
}

getChannelExample();
