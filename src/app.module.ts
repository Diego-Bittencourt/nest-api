import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}

//decorator is a function that submis metadata to other functions
// module can import other modules and this file is the main module in the application
//the good practice is to each module be on its module, except the main module which is this one


//importing the AuthModule