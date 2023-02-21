
import {SiteName,TacheName,RisqueName} from '@prisma/client'
import {Email} from '../../email/entities/email.entity'


export class SuiviExcecution {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
siteName: SiteName ;
tacheName: TacheName ;
risqueProjet: RisqueName ;
risqueTache: RisqueName ;
progression: number  | null;
debutPrevionnel: Date ;
finPrevisionnel: Date ;
nombreDeJours: number ;
debutReel: Date ;
finReel: Date ;
perturbation: number  | null;
tempsConsommes: number  | null;
Responsables?: Email[] ;
}
