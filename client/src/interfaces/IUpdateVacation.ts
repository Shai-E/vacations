import { VacationModel } from "../models/VacationModel";

export interface IUpdateVacation {
    vacation?: VacationModel;
    vacationId?: number;
}