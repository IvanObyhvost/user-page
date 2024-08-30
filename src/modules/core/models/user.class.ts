import { USER_TYPE } from '@app/shared/constants';
import { v4 } from 'uuid';

export class User {
  public uuid: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public userType: typeof USER_TYPE | string;

  constructor(data: any = {}) {
    this.uuid = data.uuid || v4();
    this.username = data.username || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.userType = data.userType || '';
  }
}
