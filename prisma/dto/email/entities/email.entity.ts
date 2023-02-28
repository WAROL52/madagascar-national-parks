
import {Role,SiteName} from '@prisma/client'
import {User} from '../../user/entities/user.entity'


export class Email {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
email: string ;
role: Role ;
siteName: SiteName ;
User?: User  | null;
}
