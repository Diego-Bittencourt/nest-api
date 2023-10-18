import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { after } from "node:test";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from "pactum";
import { AuthDto } from "../src/auth/dto";

describe("App e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    await app.init();
    await app.listen(3333);

    //reseting the database
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl("http://localhost:3333/");
  });

  afterAll(() => {
    app.close();
  });

  describe("Auth", () => {
    const dto: AuthDto = {
      email: "didi@email.com",
      password: "a1s2d3",
    };
    describe("Signup", () => {

      it('should throw error email empty', () => {
        return pactum
        .spec()
        .post('auth/signup')
        .withBody({ password: dto.password})
        .expectStatus(400);
      })

      it('should throw error password empty', () => {
        return pactum
        .spec()
        .post('auth/signup')
        .withBody({email: dto.email})
        .expectStatus(400)
      })

      it('should complain about no body', () => {
        return pactum
        .spec()
        .post('auth/signup')
        .expectStatus(400)
      })


      it("should sign up", () => {
        return pactum
          .spec()
          .post("auth/signup")
          .withBody(dto)
          .expectStatus(201)
          // .inspect(); //this one logs the body in the console as warning
      });
    });

    describe("Login", () => {

      it('should throw error email empty', () => {
        return pactum
        .spec()
        .post('auth/login')
        .withBody({ password: dto.password})
        .expectStatus(400);
      })

      it('should throw error password empty', () => {
        return pactum
        .spec()
        .post('auth/login')
        .withBody({email: dto.email})
        .expectStatus(400)
      })

      it('should complain about no body', () => {
        return pactum
        .spec()
        .post('auth/login')
        .expectStatus(400)
      })


      it("logged in", () => {
        return pactum
          .spec()
          .post("auth/login")
          .withBody(dto)
          .expectStatus(200)
          .stores('userToken', 'access_token'); //the stores() function can be used to get some data from the
                                                //response and save it in a variable to be used again, like the bearer token
                                                //the first argument is the variable name and the second is the property in the response
      });
    });
  });

  describe("User", () => {
    it("It should not work", () => {
      return pactum
      .spec()
      .get('user/me')
      .expectStatus(401)

    });

    it("It should work", () => {
      return pactum
      .spec()
      .get('user/me')
      .withBearerToken('$S{userToken}') 
      //there is a special syntax to have access to the token stored with pactum
      //you create a string normally and add $S{}. inside the curly brackets, add the variable created with stores()
      .expectStatus(200)
      .inspect()
    });

    describe("Edit user", () => {}); 
  });

  describe("Bookmark", () => {
    describe("Create bookmark", () => {
      it("it should create a bookmark", () => {
        return pactum
        .spec()
        .post('bookmark')
        .withBearerToken('${userToken}')
        .expectStatus(200)
      })
    });

    describe("Get all bookmark", () => {});

    describe("Get bookmark by id", () => {
      it("it should retrieve bookmarks by user", () => {
        return pactum
        .spec()
        .get('bookmark')
        .withBearerToken('${userToken}')
        .expectStatus(200)
        .expectBodyContains('title: *')
      })

      it("it should not work", () => {
        return pactum
        .spec()
        .get('bookmark')
        .expectStatus(400)
        .inspect()
      })
    });

    describe("Edit bookmark", () => {});

    describe("Delete bookmark", () => {});
  });
});
