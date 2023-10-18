import { IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator"

export class EditBookmarkDto  {
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

    @IsInt()
    @IsNotEmpty()
    bookmarkId: number
}