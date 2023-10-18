import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service'
import { CreateBookmarkDto } from "./dto";

@Injectable()
export class BookmarkService {
    constructor(
        private prisma: PrismaService
    ) {}

    async createBookmark(createBookmarkDto: CreateBookmarkDto) {
        const createBookmark = await this.prisma.bookmark.create({
            data: createBookmarkDto
        })
        return createBookmark
    }

    async getBookmarkFromUser(userId: number) {
        const bookmarks = await this.prisma.bookmark.findMany({
            where: {
                userId
            }
        })

        return bookmarks
    }

    async getAllBookmarks() {
        const allBookmarks = await this.prisma.bookmark.findMany()
        return allBookmarks
    }
}