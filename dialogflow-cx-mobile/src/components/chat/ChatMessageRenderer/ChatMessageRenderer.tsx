import ChatText from '../responses/ChatText/ChatText';
import ChatInfo from '../responses/ChatInfo/ChatInfo';
import ChatDescription from '../responses/ChatDescription/ChatDescription';
import ChatImage from '../responses/ChatImage/ChatImage';
import ChatVideo from '../responses/ChatVideo/ChatVideo';
import ChatAccordian from '../responses/ChatAccordian/ChatAccordian';
import ChatButton from '../responses/ChatButton/ChatButton';
import ChatList from '../responses/ChatList/ChatList';
import ChatButtonList from '../responses/ChatButtonList/ChatButtonList';
import ChatChips from '../responses/ChatChips/ChatChips';
import ChatFiles from '../responses/ChatFiles/ChatFiles';
import ChatError from '../responses/ChatError/ChatError';

import {IMessage} from '../../../interfaces/responses/IMessage';
import {IInfo} from '../../../interfaces/responses/IInfo';
import {IText} from '../../../interfaces/responses/IText';
import {IError} from '../../../interfaces/responses/IError';
import {IDescription} from '../../../interfaces/responses/IDescription';
import {IImage} from '../../../interfaces/responses/IImage';
import {IVideo} from '../../../interfaces/responses/IVideo';
import {IAccordian} from '../../../interfaces/responses/IAccordian';
import {IButton} from '../../../interfaces/responses/IButton';
import {IListItem} from '../../../interfaces/responses/IListItem';
import {IChip} from '../../../interfaces/responses/IChip';
import {IFile} from '../../../interfaces/responses/IFile';

interface ChatMessageRendererProps {
  message: IMessage;
  mainColor: string;
  mainTextColor: string;
  onButtonClick?: (value: string) => void;
}

const ChatMessageRenderer = ({
  message,
  mainColor,
  mainTextColor,
  onButtonClick,
}: ChatMessageRendererProps) => {
  const props = {mainColor, mainTextColor};

  switch (message.type) {
    case 'error':
      return <ChatError textToRender={(message.content as IError).content} />;
    case 'text': {
      const {content, isSelf} = message.content as IText;
      return (
        <ChatText
          textToRender={content}
          messageType={isSelf ? 'outbound' : 'inbound'}
          timestamp={message.added.getTime()}
          {...props}
        />
      );
    }
    case 'info':
      return <ChatInfo {...(message.content as IInfo)} />;
    case 'description':
      return <ChatDescription {...(message.content as IDescription)} />;
    case 'image':
      return <ChatImage url={(message.content as IImage).url} />;
    case 'video':
      return <ChatVideo url={(message.content as IVideo).url} />;
    case 'accordian':
      return <ChatAccordian {...(message.content as IAccordian)} />;
    case 'button':
      return (
        <ChatButton
          {...props}
          isFirst
          isLast
          isButtonList={false}
          text={(message.content as IButton).text}
          value={(message.content as IButton).value}
          onButtonClicked={onButtonClick}
        />
      );
    case 'list':
      return <ChatList items={message.content as IListItem[]} />;
    case 'button-list':
      return (
        <ChatButtonList
          buttons={message.content as IButton[]}
          onButtonClicked={(value: string) => {
            if (onButtonClick) onButtonClick(value);
          }}
          {...props}
        />
      );
    case 'chips':
      return <ChatChips chips={message.content as IChip[]} />;
    case 'files':
      return <ChatFiles files={message.content as IFile[]} />;
    default:
      return null;
  }
};

export default ChatMessageRenderer;
