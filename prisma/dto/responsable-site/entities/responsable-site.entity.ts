
import {Site} from '../../site/entities/site.entity'
import {User} from '../../user/entities/user.entity'


export class ResponsableSite {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
site?: Site ;
siteId: number ;
user?: User ;
userId: number ;
}
