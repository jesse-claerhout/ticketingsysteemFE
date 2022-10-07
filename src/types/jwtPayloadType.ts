import { JwtPayload } from "jwt-decode";

type CustomPayload = {
    handyman: boolean;
    name: string;
}

export type OpticketJwtPayload = CustomPayload & JwtPayload;