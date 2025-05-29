import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, ScrollView } from 'react-native';

import { styles } from './ChatWindow.styles';

import ChatLoading from '../ChatLoading/ChatLoading';
import ChatMessageRenderer from '../ChatMessageRenderer/ChatMessageRenderer';

import type { IMessage } from '../../../interfaces/responses/IMessage';

interface ChatWindowProps {
  sessionTimeout: number;
  delay?: number;
  mainColor: string;
  mainTextColor: string;
  sessionCanExpire?: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onButtonClick?: (value: string) => void;
  onSessionExpired: () => void;
}

const ChatWindow = forwardRef(
  (
    {
      sessionTimeout,
      delay = 1000,
      mainColor,
      mainTextColor,
      sessionCanExpire = true,
      isLoading,
      setIsLoading,
      onButtonClick,
      onSessionExpired,
    }: ChatWindowProps,
    ref
  ) => {
    const [renderedMessages, setRenderedMessages] = useState<IMessage[]>([]);
    const [renderingMessages, setRenderingMessages] = useState(false);

    const queuedMessages = useRef<IMessage[]>([]);
    const lastMessage = useRef<Date | null>(null);
    const scrollViewRef = useRef<ScrollView | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useImperativeHandle(ref, () => ({
      addMessages: async (messages: IMessage[]) => {
        const newMessages = messages
          .map((msg) => {
            if (!lastMessage.current || msg.added > lastMessage.current) {
              lastMessage.current = msg.added;
            }
            return msg;
          })
          .filter(Boolean) as IMessage[];

        queuedMessages.current.push(...newMessages);
        await renderQueuedMessages();
      },

      clearMessages: () => {
        setIsLoading(false);
        setRenderedMessages([]);
        queuedMessages.current = [];
        lastMessage.current = null;
      },
    }));

    // Session expiration timer
    useEffect(() => {
      if (!sessionCanExpire) return;

      intervalRef.current = setInterval(() => {
        if (lastMessage.current) {
          const now = new Date();
          const diffMinutes =
            (now.getTime() - lastMessage.current.getTime()) / 1000 / 60;
          if (diffMinutes > sessionTimeout) {
            onSessionExpired();
          }
        }
      }, 60000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [sessionTimeout, sessionCanExpire, onSessionExpired]);

    const renderQueuedMessages = async () => {
      if (renderingMessages) return;

      setRenderingMessages(true);

      while (queuedMessages.current.length > 0) {
        const msg = queuedMessages.current.shift();
        if (msg) {
          setRenderedMessages((prev) => [...prev, msg]);
        }

        if (msg?.visible && queuedMessages.current.length > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      setRenderingMessages(false);
    };

    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollView}
          scrollEventThrottle={8}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          {renderedMessages.map((message, index) =>
            message.visible ? (
              <ChatMessageRenderer
                key={index}
                message={message}
                mainColor={mainColor}
                mainTextColor={mainTextColor}
                onButtonClick={onButtonClick}
              />
            ) : null
          )}
          {(isLoading || renderingMessages) && (
            <ChatLoading isVisible mainColor={mainColor} />
          )}
        </ScrollView>
        <View style={styles.blockoutContainer}>
          <View style={styles.blockout} />
        </View>
      </View>
    );
  }
);

export default ChatWindow;
