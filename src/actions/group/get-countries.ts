import { apiRusia } from "../../config/api/apiRusia"
import { Country } from "../../domain/entities/country";
import { CountryResponseAPI } from '../../infrastructure/interfaces/country.response';
import { CountryMapper } from "../../infrastructure/mappers/country-mapper";

export const getCountries = async():Promise<Country[]> =>{
    try {
        const countries = await apiRusia.get<CountryResponseAPI>('/v2.0/Country/GetPaisesAll/');
        //  console.log(countries.data.data.map(CountryMapper.fromCountryToEntity));
        return countries.data.data.map(CountryMapper.fromCountryToEntity);
    } catch (error) {
        console.log(error);
        throw new Error("Error getting countries");
    }
}