import { DocumentDto } from "./document";

export interface ProjectDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  presentsInterest: boolean;
  title: string;
  url: string;
  publicationDate: string;

  documents: DocumentDto[];

  numarInregistrareSenat?: string;
  numarInregistrareGuvern?: string;
  numarInregistrareCDep?: string;
  proceduraLegislativa?: string;
  cameraDecizionala?: string;
  termenAdoptare?: string;
  tipInitiativa?: string;
  caracter?: string;
  esteProceduraDeUrgenta?: boolean;
  stadiu?: string;
  initiator?: string;
  consultati?: string;
  source?: string;

  attachments: string[];
}