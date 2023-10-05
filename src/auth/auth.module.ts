import { Module } from "@nestjs/common"

@Module({})
export class AuthModule {}

//the minimum to create a module is a @Module decorator
//which is a function and expects an object as parameters
//under the decorator, the class creation
//of course, export the class to be available in other files