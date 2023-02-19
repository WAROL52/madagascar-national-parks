
import {Formation} from '../../formation/entities/formation.entity'
import {Excecution} from '../../excecution/entities/excecution.entity'
import {ResponsableSite} from '../../responsable-site/entities/responsable-site.entity'


export class Site {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
Formation?: Formation  | null;
Excecution?: Excecution  | null;
ResponsableSite?: ResponsableSite  | null;
}
