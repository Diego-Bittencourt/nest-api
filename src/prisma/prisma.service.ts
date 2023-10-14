import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    //this method is to clean the db. But we need to delete bookmark before.
    //therefore I'll use a transaction that receives an array and will perform in order
    return this.$transaction([

      this.bookmark.deleteMany(),
      this.user.deleteMany()
    ])
  }
}