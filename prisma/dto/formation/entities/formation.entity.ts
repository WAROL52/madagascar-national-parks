
import {Site} from '../../site/entities/site.entity'
import {Etape} from '../../etape/entities/etape.entity'


export class Formation {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
site?: Site ;
siteId: number ;
Etape?: Etape[] ;
}
