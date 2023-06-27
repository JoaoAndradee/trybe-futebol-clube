import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamModel from '../database/models/TeamModel';
import { findById, getAll } from './mocks/teamsMock'
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota teams', () => {

  beforeEach(async () => {
    sinon
      .stub(TeamModel, "findOne")
      .resolves({
        ...findById
      } as TeamModel);
  });

  afterEach(() => {
    // (TeamModel.findOne as sinon.SinonStub).restore();
    sinon.restore();
  })

  it('Testa se retorna o time pelo id', async () => {
    const res = await chai.request(app).get('/teams/3');
    expect(res.status).to.equal(200);
    expect(res.body).deep.equal(findById);
  })

  it('Testa se retorna todos os times', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(getAll as []);
    const res = await chai.request(app).get('/teams');
    expect(res.status).to.equal(200);
    expect(res.body).deep.equal(getAll);
  })
})
