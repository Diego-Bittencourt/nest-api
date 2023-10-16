import { Controller, Get, UseGuards } from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { BookmarkService } from "./bookmark.service";


@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(
        private bookmarkService: BookmarkService
    ) {}

    @Get()
    getAllBookmarksFromUser(@GetUser('id') userId: number) {
        
    }
}