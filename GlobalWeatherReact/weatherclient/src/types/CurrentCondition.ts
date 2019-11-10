export interface CurrentCondition {
    LocalObservationDateTime: string;
    WeatherText: string;
    WeatherIcon: number;
    IsDayTime: boolean;
    Temperature: Temperature;
};

export interface Metric {
    Unit: string;
    UnitType: number;
    Value: number;
};

export interface Imperial {
    Unit: string;
    UnitType: number;
    Value: number;
};

export interface Temperature {
    Imperial: Imperial;
    Metric: Metric;
};