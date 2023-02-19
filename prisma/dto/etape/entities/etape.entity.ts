
import {RisqueProjet} from '../../risque-projet/entities/risque-projet.entity'
import {RisqueTache} from '../../risque-tache/entities/risque-tache.entity'
import {Formation} from '../../formation/entities/formation.entity'
import {Excecution} from '../../excecution/entities/excecution.entity'


export class Etape {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
risqueProject?: RisqueProjet ;
risqueProjetId: number ;
risqueTache?: RisqueTache ;
risqueTacheId: number ;
progression: number  | null;
debutPrevionnel: Date  | null;
nombreDeJours: number  | null;
finPrevisionnel: Date  | null;
debutReel: Date  | null;
finReel: Date  | null;
perturbation: number  | null;
tempsConsommes: number  | null;
formation?: Formation ;
formationId: number ;
Excecution?: Excecution  | null;
excecutionId: number  | null;
}
