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
}