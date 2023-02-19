
import {User} from '../../user/entities/user.entity'


export class Email {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
email: string ;
passwordToken: string  | null;
role: string  | null;
User?: User  | null;
}
