import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';
import Auth from './components/Auth';
import MessagingContainer from './components/MessagingContainer';
import Video from './components/Video';

const client = StreamChat.getInstance('65ukcf2g2k62');

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [channel, setChannel] = useState(null);

  const authToken = cookies.AuthToken;

  // useEffect(() => {

  // }, []);

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HashedPassword,
        },
        authToken
      )
      const channel = await client.channel('gaming', 'gaming-demo', {
        name: 'Gaming Demo',
      })
      setChannel(channel)
    } catch (err) {
      console.log(err);
    }
  };

  if (authToken) setupClient();

  return (
    <div>
      {!authToken && <Auth />}
      {authToken && <Chat client={client} darkMode={true}>
        <Channel channel={channel}>
          <Video />
          <MessagingContainer />
        </Channel>
      </Chat>}
    </div>
  );
};

export default App;