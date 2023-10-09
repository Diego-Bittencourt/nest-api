import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";


@Injectable({})
export class PrismaService extends PrismaClient{
    constructor(config: ConfigService) {
        //the super will the constructor from the class I'm extending
        super({
        datasources: {
            db: {
                // url: 'postgresql://postgres:123@localhost:5434/nest?schema=public'
                url: config.get('DATABASE_URL')
            }
        }
        })
    }
}