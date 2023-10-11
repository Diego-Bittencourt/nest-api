import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
}

//Im just creating a custom guard so I can use it 
//throughout the app without the trouble to repeat everything.