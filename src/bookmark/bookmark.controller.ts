import { Controller, Get, UseGuards, Post, Body } from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { BookmarkService } from "./bookmark.service";
import { CreateBookmarkDto } from "./dto/index";


@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(
        private bookmarkService: BookmarkService
    ) {}

    @Get()
    getAllBookmarksFromUser(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarkFromUser(userId)
    }

    @Post()
    createBookmark(@Body() createBookmarkDto: CreateBookmarkDto) {
        return this.bookmarkService.createBookmark(createBookmarkDto)
    }

    @Get('all')
    getAllBookmarks() {
        return this.bookmarkService.getAllBookmarks()
    }
}