import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";


//the global decorator, along with the exports property down below, 
//makes the module available globally in the application
@Global()
@Module({ 
    providers: [PrismaService], 
    exports: [PrismaService] 
})

export class PrismaModule {}
