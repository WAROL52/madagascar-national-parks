
import {SiteName,RisqueName} from '@prisma/client'
import {Email} from '../../email/entities/email.entity'


export class SuiviFormation {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
siteName: SiteName ;
tacheName: string ;
risqueProjet: RisqueName ;
risqueTache: RisqueName ;
progression: number  | null;
debutPrevionnel: Date ;
finPrevisionnel: Date ;
nombreDeJours: number ;
debutReel: Date  | null;
finReel: Date  | null;
perturbation: number  | null;
tempsConsommes: number  | null;
Responsables?: Email[] ;
}
