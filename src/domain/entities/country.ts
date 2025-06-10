export interface Country {
    idPais:     number;
    nomPais:    string;
    grupo:      Grupo;
    continente: Continente;
    tecnico:    Tecnico;
}

export interface Continente {
    idContinente: number;
    descripcion:  string;
}

export interface Grupo {
    idGrupo:     number;
    descripcion: string;
}

export interface Tecnico {
    idTecnico:       number;
    nomTecnico:      string;
    nacionalidad:    string;
    fechaNacimiento: Date;
}
