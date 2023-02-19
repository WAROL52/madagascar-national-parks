
import {Etape} from '../../etape/entities/etape.entity'


export class RisqueTache {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
color: string  | null;
value: number ;
title: string ;
Etape?: Etape[] ;
}
