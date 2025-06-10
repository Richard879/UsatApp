export interface  GroupResponseApi {
    data:      IGroup[];
    isSuccess: boolean;
    message:   string;
    errors:    any[];
}

export interface IGroup {
    idGrupo:     number;
    descripcion: string;
}