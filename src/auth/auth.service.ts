import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
//prisma generate the typescript types automatically

//the Injectable decorator (for service) and the class declaration
@Injectable({})
export class AuthService {
   constructor(private prisma: PrismaService) {}

   login() {
    return 'logged in'

   }

   signup() {
    return 'signed up'
   }
}