
import {Sexe} from '@prisma/client'
import {Email} from '../../email/entities/email.entity'
import {ResponsableSite} from '../../responsable-site/entities/responsable-site.entity'


export class User {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
email?: Email ;
emailId: number ;
nom: string ;
prenom: string ;
motdepasse: string  | null;
tel1: string  | null;
tel2: string  | null;
adresse: string  | null;
dataNaissance: Date  | null;
lieuNaissance: string  | null;
ResponsableSite?: ResponsableSite  | null;
sexe: Sexe ;
description: string  | null;
avatar: string  | null;
}
