import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

//using the class-validator and class-transformer, I'll change the dto from a interface for a class
//Now I can start using decorators to check the property in the request