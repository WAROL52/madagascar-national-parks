
import {SiteName} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateSuiviFormationDto {
  @ApiProperty({ enum: SiteName})
siteName?: SiteName;
tacheName?: string;
progression?: number;
debutPrevionnel?: Date;
finPrevisionnel?: Date;
nombreDeJours?: number;
debutReel?: Date;
finReel?: Date;
perturbation?: number;
tempsConsommes?: number;
}
