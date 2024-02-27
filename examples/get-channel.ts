import { getChannel } from '../src/utils/channels.utils';

export function getChannelExample() {
  const channelId = getChannel('Polymer', '84532', '11155420');
  console.log(`Polymer channel from 84532 to 11155420: ${channelId}`);
}

getChannelExample();
