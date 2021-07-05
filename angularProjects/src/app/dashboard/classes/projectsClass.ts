export class ProjectsClass{

    sifra! : number;
    naziv! : string;
    nositelj! : string;
    vrijednost! : number;
    grad! : string;
    voditelj! : string; 
    status! : string;
    voditeljSifra! : number;
    clanoviProjekta: Array<{sifra: number, ime: string, prezime: string, projektSifra: number, voditelj: number}>;
}