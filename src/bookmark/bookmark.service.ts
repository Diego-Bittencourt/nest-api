import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BookmarkService {
    constructor(
        private prisma: PrismaService
    ) {}

    async createBookmark() {
        return 'bookmar created'
    }
}