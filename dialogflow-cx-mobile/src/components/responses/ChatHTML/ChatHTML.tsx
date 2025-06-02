import RenderHtml from 'react-native-render-html';

const ChatHTML = ({
  textToRender,
  contentWidth,
  baseStyle,
}: {
  textToRender: string;
  contentWidth?: number;
  baseStyle: any;
}) => {
  return (
    <RenderHtml
      contentWidth={contentWidth ? contentWidth : undefined}
      source={{ html: textToRender }}
      baseStyle={baseStyle}
      tagsStyles={{
        b: { fontWeight: 'bold' },
        strong: { fontWeight: 'bold' },
        i: { fontStyle: 'italic' },
        em: { fontStyle: 'italic' },
        u: { textDecorationLine: 'underline' },
      }}
    />
  );
};

export default ChatHTML;
