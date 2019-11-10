import { City } from './City';

export class CityMetaData {
    public id: string;
    public name: string;
    public countryId: string;

    public constructor(city: City) {
        this.id = city.Key;
        this.name = city.EnglishName;
        this.countryId = city.Country.ID;
    }
}
