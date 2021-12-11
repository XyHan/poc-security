import { SpaceCommandRepositoryInterface } from '../space.command-repository.interface';
import { SpaceInterface } from '../../../model/security/space.model';
import { SpaceRepositoryException } from '../space.repository.exception';
import { SpaceFixtures } from '../../../fixtures/space.fixtures';

export class SpaceCommandRepositoryMock implements SpaceCommandRepositoryInterface {
  public async create(space: SpaceInterface): Promise<SpaceInterface> {
    this.isValidSpace(space);
    try {
      SpaceFixtures.saveSpace(space);
      return Promise.resolve(space);
    } catch (e) {
      const message: string = `SpaceCommandRepository - Error on create space '${space.uuid}'`;
      throw new SpaceRepositoryException(message);
    }
  }

  public async delete(space: SpaceInterface): Promise<SpaceInterface> {
    try {
      SpaceFixtures.deleteSpace(space);
      return Promise.resolve(space);
    } catch (e) {
      const message: string = `SpaceCommandRepository - Error on delete space '${space.uuid}'`;
      throw new SpaceRepositoryException(message);
    }
  }

  public async update(space: SpaceInterface): Promise<SpaceInterface> {
    this.isValidSpace(space);
    try {
      SpaceFixtures.saveSpace(space);
      return Promise.resolve(space);
    } catch (e) {
      const message: string = `SpaceCommandRepository - Error on update space '${space.uuid}'`;
      throw new SpaceRepositoryException(message);
    }
  }

  private isValidSpace(space: SpaceInterface): boolean {
    if (!space.uuid.length) {
      const message: string = `SpaceCommandRepository - Error on create space '${space.uuid}' - uuid cannot be empty`;
      throw new SpaceRepositoryException(message);
    }
    return true;
  }
}
