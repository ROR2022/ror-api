import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

export interface UserService {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  update(id: string, user: UpdateUserDto): Promise<User>;
  remove(id: string): Promise<User>;
}
