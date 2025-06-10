import { Country } from "../../domain/entities/country";
import { ICountry } from "../interfaces/country.response";


export class CountryMapper {
    static fromCountryToEntity( item : ICountry): Country {
        return {
            idPais: item.idPais,
            nomPais: item.nomPais,
            grupo: {
                idGrupo: item.grupo.idGrupo,
                descripcion: item.grupo.descripcion
            },
            continente: {
                idContinente: item.continente.idContinente,
                descripcion: item.continente.descripcion
            },
            tecnico: {
                idTecnico: item.tecnico.idTecnico,
                nomTecnico: item.tecnico.nomTecnico,
                nacionalidad: item.tecnico.nacionalidad,
                fechaNacimiento: item.tecnico.fechaNacimiento
            }
        }
    }
}