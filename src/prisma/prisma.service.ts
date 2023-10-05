import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable({})
export class PrismaService extends PrismaClient{
    constructor() {
        //the super will the constructor from the class I'm extending
        super({
        datasources: {
            db: {
                url: 'postgresql://postgres:123@localhost:5434/nest?schema=public'
            }
        }
        })
    }
}