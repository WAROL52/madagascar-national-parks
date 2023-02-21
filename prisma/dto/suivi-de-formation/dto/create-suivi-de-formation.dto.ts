import { SiteName } from "@prisma/client";

export class CreateSuiviDeFormationDto {
  siteName: SiteName;
  tacheName: string;
  progression?: number;
  debutPrevionnel: Date;
  finPrevisionnel: Date;
  nombreDeJours: number;
  debutReel?: Date;
  finReel?: Date;
  perturbation?: number;
  tempsConsommes?: number;
}
