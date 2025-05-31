import type { IAccordian } from './IAccordian';
import type { IButton } from './IButton';
import type { IChip } from './IChip';
import type { IDescription } from './IDescription';
import type { IError } from './IError';
import type { IFile } from './IFile';
import type { IImage } from './IImage';
import type { IInfo } from './IInfo';
import type { IListItem } from './IListItem';
import type { IText } from './IText';
import type { IVideo } from './IVideo';

export interface IMessage {
  id: string;
  type:
    | 'error'
    | 'text'
    | 'button'
    | 'button-list'
    | 'info'
    | 'description'
    | 'image'
    | 'video'
    | 'list'
    | 'accordian'
    | 'chips'
    | 'files'
    | 'form';
  content:
    | IError
    | IText
    | IButton
    | IButton[]
    | IInfo
    | IDescription
    | IImage
    | IVideo
    | IListItem[]
    | IAccordian
    | IChip[]
    | IFile[]
    | IForm;
  visible: boolean;
  added: Date;
}
