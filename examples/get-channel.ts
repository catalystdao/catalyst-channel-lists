import { getChannel } from '../src/utils/channels.utils';

export function getChannelExample() {
  let channelId = getChannel('Polymer', '84532', '11155420');
  console.log(`Polymer channel from 84532 to 11155420: ${channelId}`);

  channelId = getChannel('Wormhole', '421614', '11155111');
  console.log(`Wormhole channel from 421614 to 11155111: ${channelId}`);
}

getChannelExample();
