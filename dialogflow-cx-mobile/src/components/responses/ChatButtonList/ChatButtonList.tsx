import { View } from 'react-native';

import DFChatButton from '../ChatButton/ChatButton';

import { styles } from './ChatButtonList.styles';
import type { IButton } from '../../../interfaces/responses/IButton';

const ChatButtonList = ({
  buttons,
  mainColor,
  mainTextColor,
  onButtonClicked,
}: {
  buttons: IButton[];
  mainColor: string;
  mainTextColor: string;
  onButtonClicked: (value: string) => void;
}) => {
  return (
    <View
      style={[
        styles.container,
        buttons.length === 1 ? styles.single : styles.multiple,
      ]}
    >
      {buttons.map((btn, index) => (
        <DFChatButton
          key={index}
          isFirst={index === 0}
          isLast={index === buttons.length - 1}
          isButtonList={true}
          text={btn.text}
          value={btn.value}
          mainColor={mainColor}
          mainTextColor={mainTextColor}
          onButtonClicked={(value: string) => onButtonClicked(value)}
        />
      ))}
    </View>
  );
};

export default ChatButtonList;
