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
import * as JsonWebToken from 'jsonwebtoken';

const UUID = '0d66db91-4441-4563-967c-797d767c7288';
const EMAIL = 'somebody@unknow.com';
const PASSWORD = 'changeme';

describe('UserController tests suite', () => {
  let app: INestApplication;
  let token: string;
  let wrongToken: string;
  let badRoleToken: string;

  beforeAll(async () => {
    token = JsonWebToken.sign(
      { uuid: '5e4e03a6-6e6f-4b39-a158-307d1e9082d8', email: 'user2@test.com' },
      Buffer.from('changeMeAsSoonAsPossible', 'base64').toString(),
      { algorithm: 'HS256', expiresIn: '1d' }
    );

    wrongToken = JsonWebToken.sign(
      { uuid: 'bad-uuid', email: 'bad-email' },
      Buffer.from('changeMeAsSoonAsPossible', 'base64').toString(),
      { algorithm: 'HS256', expiresIn: '1d' }
    );

    badRoleToken = JsonWebToken.sign(
      { uuid: '0d66db91-4441-4563-967c-797d767c7288', email: 'user2@test.com' },
      Buffer.from('changeMeAsSoonAsPossible', 'base64').toString(),
      { algorithm: 'HS256', expiresIn: '1d' }
    );

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CqrsModule, SecurityModule, UiHttpModule, LoggerModule],
    })
      .overrideProvider(LoggerAdapterService)
      .useClass(LoggerMock)
      .overrideProvider(UserQueryRepository)
      .useClass(UserQueryRepositoryMock)
      .overrideProvider(UserCommandRepository)
      .useClass(UserCommandRepositoryMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST - should return a UserInterface', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email: EMAIL,
      password: PASSWORD,
    });
    expect(response.status).toBe(201);
    expect(response.body.email).toBe(EMAIL);
    expect(response.body.status).toBe(1);
    expect(response.body.uuid).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.createdBy).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body.updatedBy).toBeDefined();
  });

  it('UPDATE - should return a UserInterface', async () => {
    const postResponse = await request(app.getHttpServer()).post('/users').send({
      email: EMAIL,
      password: PASSWORD,
    });
    const response = await request(app.getHttpServer())
      .put(`/users/${postResponse.body.uuid}`)
      .send({
        status: 3,
        email: `${EMAIL}.br`,
        roles: ['USER']
      })
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(`${EMAIL}.br`);
    expect(response.body.status).toBe(3);
    expect(response.body.uuid).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.createdBy).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body.updatedBy).toBeDefined();
  });

  it('UPDATE - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${UUID}`)
      .send({
        status: 3,
        email: `${EMAIL}.br`,
        roles: ['ADMIN']
      })
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('UPDATE - should return a 403', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${UUID}`)
      .send({
        status: 3,
        email: `${EMAIL}.br`,
        roles: ['ADMIN']
      })
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('DELETE - should return a UserInterface', async () => {
    const postResponse = await request(app.getHttpServer()).post('/users').send({
      email: EMAIL,
      password: PASSWORD,
    });
    const response = await request(app.getHttpServer())
      .delete(`/users/${postResponse.body.uuid}`)
      .send()
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
  });

  it('DELETE - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/${UUID}`)
      .send()
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('DELETE - should return a 403', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/${UUID}`)
      .send()
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('POST - should return 400 bad email attribute', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set({ 'Authorization': `Bearer ${token}` })
      .send({
        email: 1,
        password: PASSWORD,
      })
    ;
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 bad password attribute', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set({ 'Authorization': `Bearer ${token}` })
      .send({
        email: EMAIL,
        password: 1,
      })
    ;
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set({ 'Authorization': `Bearer ${token}` })
      .send({})
    ;
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 bad status attribute', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${UUID}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .send({
        status: '3',
        email: `${EMAIL}.br`,
        roles: ['ADMIN']
      })
    ;
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 bad email attribute', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${UUID}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .send({
        status: 3,
        email: 2,
        roles: ['ADMIN']
      })
    ;
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 bad email format attribute', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${UUID}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .send({
        status: 3,
        email: 'idontknow',
        roles: ['ADMIN']
      })
    ;
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 wrong role attribute', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${UUID}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .send({
        status: 3,
        email: 'idontknow',
        roles: ['WRONG_ROLE']
      })
    ;
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${UUID}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .send({})
    ;
    expect(response.status).toBe(400);
  });

  it('DELETE - should return a bad request status', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/bad-uuid`)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });
});
