export class Student {
 
    id: number = 0;
    prenom: string = "";
    nom: string = "";
    sexe: Sexe | undefined;
    dateNaissance: string = "";
    classe: Classe | undefined;
    serie: Serie | undefined;
}

export enum Sexe {
Masculin = 'masculin',
Feminin = 'feminin'
}

export enum Classe {
Terminale = 'Terminale',
Première = 'Première',
Seconde = 'Seconde'
}

export enum Serie {
S = 'S',
L = 'L',
T = 'T',
S1 = 'S1',
S2 = 'S2',
S3 = 'S3',
T1 = 'T1',
T2 = 'T2',
L1 = 'L1',
L2 = 'L2'
}