import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';

const client = StreamChat.getInstance('65ukcf2g2k62');

client.connectUser(
  {
    id: 'dave-matthews',
    name: 'Dave Matthews',
  },
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.ZNRqlbFydU8c7FEi95Zi3RFZ1ag0pW - JMtsz_c6vZcg,
);

const channel = client.channel('gaming', {
  name: 'Gaming Channel',
  members: ['dave-matthews', 'trey-anastasio'],
});

const App = () => (
  <Chat client={client}>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);