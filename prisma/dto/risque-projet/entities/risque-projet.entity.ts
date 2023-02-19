
import {Etape} from '../../etape/entities/etape.entity'


export class RisqueProjet {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
value: number ;
title: string ;
color: string  | null;
Etape?: Etape[] ;
}
