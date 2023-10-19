import { Controller, Get, UseGuards, Post, Body, Patch, Delete } from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { BookmarkService } from "./bookmark.service";
import { CreateBookmarkDto } from "./dto/index";
import { EditBookmarkDto } from "./dto/editBookmark.dto";


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

    @Patch()
    editBookmark(@GetUser('id') userId: number,@Body () editBookmarkDto: EditBookmarkDto) {
        return this.bookmarkService.editBookmark(userId, editBookmarkDto)
    }

    @Delete()
    deleteBookmark(@Body('bookmarkId') bookmarkId: number, @GetUser('id') userId: number) {
        return this.bookmarkService.deleteBookmark(bookmarkId, userId)
    }
}