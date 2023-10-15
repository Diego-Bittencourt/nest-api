import { Optional } from "@nestjs/common";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class EditUserDto {

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;
}