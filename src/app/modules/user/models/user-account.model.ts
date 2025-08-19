import { UserData } from "./user-data.model";

export interface UserAccount extends UserData {
    id: string,
    isAdmin: boolean
}