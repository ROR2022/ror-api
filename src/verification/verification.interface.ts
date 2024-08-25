import { Verification } from './entities/verification.entity';

export interface IVerificationService {
  create(createVerificationDto: Verification): Promise<Verification>;
  findAll(): Promise<Verification[]>;
  findOne(id: string): Promise<Verification>;
  update(
    id: string,
    updateVerificationDto: Verification,
  ): Promise<Verification>;
  remove(id: string): Promise<Verification>;
}
