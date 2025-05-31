import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import uuid from 'react-native-uuid';

import ChatWindow from '../ChatWindow/ChatWindow';
import ChatInput from '../ChatInput/ChatInput';
import SessionExpired from '../SessionExpired/SessionExpired';

import { styles } from './ChatDialog.styles';
import { ChatService } from '../../../services/chat.service';
import type { IMessage } from '../../../interfaces/responses/IMessage';

interface ChatDialogProps {
  placeholder?: string;
  chatURL: string;
  apiKey?: string;
  agentPath: string;
  languageCode?: string;
  sessionTimeout?: number;
  startMessage?: string;
  welcomeMessage?: string;
  mainColor: string;
  mainTextColor: string;
  sessionVariables?: Record<string, string>;
}

const ChatDialog = forwardRef(
  (
    {
      placeholder = 'Message...',
      chatURL,
      apiKey,
      agentPath,
      languageCode = 'en',
      sessionTimeout = 30,
      startMessage,
      welcomeMessage,
      mainColor,
      mainTextColor,
      sessionVariables = {},
    }: ChatDialogProps,
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSessionExpired, setShowSessionExpired] = useState(false);
    const [sessionId, setSessionId] = useState<string>(uuid.v4() as string);

    const chatWindowRef = useRef<typeof ChatWindow | null>(null);

    useImperativeHandle(ref, () => ({
      restart: async () => {
        await restartSession();
      },
    }));

    const restartSession = useCallback(async () => {
      await chatWindowRef.current?.clearMessages();
      setSessionId(uuid.v4() as string);
      setShowSessionExpired(false);
    }, []);

    const addMessage = useCallback(
      (content: string, isSelf: boolean, isVisible = true) => {
        const messageId = uuid.v4() as string;

        chatWindowRef.current?.addMessages([
          {
            id: messageId,
            visible: isVisible,
            type: 'text',
            content: { content, isSelf },
            added: new Date(),
          },
        ]);
      },
      []
    );

    const handleInput = useCallback(
      (text: string, isVisible = true) => {
        addMessage(text, true, isVisible);

        setIsLoading(true);

        new ChatService(chatURL, apiKey, agentPath, languageCode)
          .sendMessage(sessionId, text, sessionVariables)
          .then((responses) => {
            setIsLoading(false);

            const newMessages = responses.map((message: IMessage) => ({
              id: uuid.v4() as string,
              visible: true,
              type: message.type,
              content: message.content,
              added: new Date(),
            }));

            chatWindowRef.current?.addMessages(newMessages);
          });
      },
      [addMessage, chatURL, agentPath, sessionId]
    );

    const initializeSession = useCallback(() => {
      setIsLoading(true);

      if (welcomeMessage) {
        addMessage(welcomeMessage, false);
      }

      if (startMessage) {
        handleInput(startMessage, false);
      }

      setIsLoading(false);
    }, [welcomeMessage, startMessage, addMessage, handleInput]);

    useEffect(() => {
      initializeSession();
    }, [sessionId, initializeSession]);

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <ChatWindow
            ref={chatWindowRef}
            sessionTimeout={sessionTimeout}
            mainColor={mainColor}
            mainTextColor={mainTextColor}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onSessionExpired={() => setShowSessionExpired(true)}
            onButtonClick={handleInput}
          />
          <ChatInput placeholder={placeholder} onMessageEntered={handleInput} />
          {showSessionExpired && (
            <SessionExpired
              mainColor={mainColor}
              mainTextColor={mainTextColor}
              onRestartSession={restartSession}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
);

export default ChatDialog;
