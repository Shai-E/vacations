import { VacationModel } from "../models/VacationModel";

export interface IFormattedVacationData {
    vacations?: VacationModel[];
    followed?: VacationModel[];
    notFollowed?: VacationModel[];
    followedIds?: number[];
    currVacationId?: null;
}