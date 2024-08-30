import { TOASTER_TYPES } from '@app/shared/constants';

export interface ToasterPayload {
  type: TOASTER_TYPES;
  message: string;
}
