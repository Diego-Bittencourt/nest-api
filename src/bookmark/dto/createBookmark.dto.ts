import { IsInt, IsNotEmpty, IsOptional, IsString, isString } from "class-validator"


export class CreateBookmarkDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsNotEmpty()
    link: string

    @IsInt()
    @IsNotEmpty()
    userId: number
}