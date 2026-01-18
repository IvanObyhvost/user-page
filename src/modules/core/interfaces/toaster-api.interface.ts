import { TOASTER_TYPE } from '@app/shared/constants';

export interface ToasterPayload {
  type: TOASTER_TYPE;
  message: string;
}
