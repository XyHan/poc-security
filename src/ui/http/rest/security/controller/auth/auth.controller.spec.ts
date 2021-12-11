import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { SecurityModule } from '../../../../../../infrastructure/security/security.module';
import { LoggerMock } from '../../../../../../domain/utils/logger/logger.mock';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserQueryRepositoryMock } from '../../../../../../domain/repository/user/mock/user.query-repository.mock';
import { UserQueryRepository } from '../../../../../../infrastructure/security/repository/user.query-repository';
import { UserCommandRepository } from '../../../../../../infrastructure/security/repository/user.command-repository';
import { UserCommandRepositoryMock } from '../../../../../../domain/repository/user/mock/user.command-repository.mock';
import { AppModule } from '../../../../../../infrastructure/app/app.module';
import { UiHttpModule } from '../../../../ui-http.module';
import { LoggerModule } from '../../../../../../infrastructure/logger/logger.module';
import { INestApplication } from '@nestjs/common';
import { AuthService } from '../../../../../../infrastructure/security/service/auth/auth.service';
import { AuthManagerMock } from '../../../../../../domain/utils/security/auth-manager.mock';

const EMAIL = 'user2@test.com';
const PASSWORD = 'password2';

describe('AuthController tests suite', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CqrsModule, SecurityModule, UiHttpModule, LoggerModule],
    })
      .overrideProvider(LoggerAdapterService)
      .useClass(LoggerMock)
      .overrideProvider(UserQueryRepository)
      .useClass(UserQueryRepositoryMock)
      .overrideProvider(UserCommandRepository)
      .useClass(UserCommandRepositoryMock)
      .overrideProvider(AuthService)
      .useClass(AuthManagerMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST - should return a TokenInterface', async () => {
    const response = await request(app.getHttpServer()).post('/login').send({
      email: EMAIL,
      password: PASSWORD,
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.');
  });

  it('POST - should return 400 bad user', async () => {
    const response = await request(app.getHttpServer()).post('/login').send({
      email: 'bad-email',
      password: PASSWORD,
    });
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 bad password', async () => {
    const response = await request(app.getHttpServer()).post('/login').send({
      email: EMAIL,
      password: 'bad-password',
    });
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 bad email attribute', async () => {
    const response = await request(app.getHttpServer()).post('/login').send({
      email: 1,
      password: PASSWORD,
    });
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 bad password attribute', async () => {
    const response = await request(app.getHttpServer()).post('/login').send({
      email: EMAIL,
      password: 1,
    });
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer()).post('/login').send({});
    expect(response.status).toBe(400);
  });

  it('GET - should return a TokenInterface', async () => {
    const response = await request(app.getHttpServer())
      .get('/refresh-token')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.C8yboJRqQNelrZiI7R_J5AgUFLbWqlzOTAfoqAKUR5A'
      );
    expect(response.status).toBe(200);
    expect(response.body.token).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.');
  });

  it('GET - with auth - should return an error', async () => {
    const response = await request(app.getHttpServer())
      .get('/refresh-token')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      );
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('AuthController - login error: RefreshTokenQueryHandler - Invalid token');
  });

  it('GET - without auth - should return an error', async () => {
    const response = await request(app.getHttpServer())
      .get('/refresh-token');
    expect(response.status).toBe(401);
    expect(response.body.message).toContain('Invalid token');
  });
});
