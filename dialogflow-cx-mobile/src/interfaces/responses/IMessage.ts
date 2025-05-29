import {IAccordian} from './IAccordian';
import {IButton} from './IButton';
import {IChip} from './IChip';
import {IDescription} from './IDescription';
import {IError} from './IError';
import {IFile} from './IFile';
import {IForm} from '../form/IForm';
import {IImage} from './IImage';
import {IInfo} from './IInfo';
import {IListItem} from './IListItem';
import {IText} from './IText';
import {IVideo} from './IVideo';

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
