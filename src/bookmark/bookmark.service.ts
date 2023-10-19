import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service'
import { CreateBookmarkDto } from "./dto";
import { EditBookmarkDto } from "./dto/editBookmark.dto";

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

    async editBookmark(userId: number, editBookmarkDto: EditBookmarkDto) {
        const bookmarkById = await this.prisma.bookmark.findUnique({
            where: {
                id: editBookmarkDto.bookmarkId
            }
        })

        if (userId !== bookmarkById.userId) {
            throw new ForbiddenException('You are not the creator of this bookmar')
        }

        const newDate = new Date()

        const bookmarkId = bookmarkById.id
        delete bookmarkById.id
        delete editBookmarkDto.bookmarkId
        
        const updatedBookmark = {...bookmarkById, ...editBookmarkDto, updatedAt: newDate}

        const returnedEditedBookmark = await this.prisma.bookmark.update({
            where: {
                id: bookmarkId
            },
            data: updatedBookmark
        })

        return returnedEditedBookmark

    }

    async deleteBookmark(bookmarkId: number, userId: number) {

        console.log(bookmarkId, userId)
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
                userId: userId
            }
        })

        console.log("bookmark", bookmark)
        if (bookmark != null) {
            const deletedBookmark = this.prisma.bookmark.delete({
                where: {
                    id: bookmarkId
                }
            })

            return {
                status: 'success',
                ...deletedBookmark
            }
        } else {
            throw new ForbiddenException('The bookmark doesn\'t exist, or you are not the owner')
        }

        
    }
}