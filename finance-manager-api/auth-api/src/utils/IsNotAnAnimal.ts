import { AnimalTypes } from "../types/AnimalTypes";
export class IsNotAnimalError extends Error{
    constructor(message: string = "Is not an Animal"){
      
        
        if(!AnimalTypes.CACHORRO || !AnimalTypes.GATO || !AnimalTypes.CAGADO){
            super(message);
        }
    }
}