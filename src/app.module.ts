import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
})
export class AppModule {}

//decorator is a function that submis metadata to other functions
// module can import other modules and this file is the main module in the application
//the good practice is to each module be on its module, except the main module which is this one


//importing the AuthModule