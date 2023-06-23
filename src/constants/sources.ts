import { Translations } from "./translations";

export enum SourceDescription {
    senat = 'Senat',
    guvern = 'Guvern',
    camera_deputatilor = 'Camera deputatilor'
}


export const sources = [
    'camera_deputatilor',
    'mfinante',
    'mmediu',
    'mdezvoltarii',
    'meducatiei',
    'mtransport',
    'mai',
    'mae',
    'mapn',
    'mjustitiei',
    'senat_pl',
    'camera_deputatilor_pl',
  ];
  
  export const translatedSources = sources.map((source) => Translations[source]);