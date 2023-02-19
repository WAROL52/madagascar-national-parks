
import {Role} from '@prisma/client'
import {User} from '../../user/entities/user.entity'


export class Email {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
email: string ;
passwordToken: string  | null;
role: Role ;
User?: User  | null;
}
