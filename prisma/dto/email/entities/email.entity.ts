
import {Role,SiteName} from '@prisma/client'
import {User} from '../../user/entities/user.entity'
import {SuiviFormation} from '../../suivi-formation/entities/suivi-formation.entity'
import {SuiviExcecution} from '../../suivi-excecution/entities/suivi-excecution.entity'
import {SuiviDeFormation} from '../../suivi-de-formation/entities/suivi-de-formation.entity'


export class Email {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
email: string ;
passwordToken: string  | null;
role: Role ;
siteName: SiteName ;
User?: User  | null;
suiviFormation?: SuiviFormation  | null;
suiviExcecution?: SuiviExcecution  | null;
suiviFormationId: number  | null;
suiviExcecutionId: number  | null;
SuiviDeFormation?: SuiviDeFormation  | null;
suiviDeFormationId: number  | null;
}
