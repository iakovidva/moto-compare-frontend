export interface MotorcycleSummary {
    id : string,
    manufacturer : string,
    model : string,
    yearRange : string,
    image : string,
    category : string,
    displacement: number, 
    horsePower:  number
}

export interface RankedMotorcycleSummary extends MotorcycleSummary {
    fuelConsumption: number,
    weight: number,
    score: number;
}