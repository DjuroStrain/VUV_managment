export class activityClass{
    projekt! : string;
    naziv! : string;
    opis!: string;
    vrijeme!: number;
    clanoviProjekta: Array<{sifra: number, ime: string, prezime: string, projektSifra: number, voditelj: number}>;
}