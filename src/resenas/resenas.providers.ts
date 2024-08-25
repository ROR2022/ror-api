import { Connection } from 'mongoose';
import { ResenaSchema } from './entities/resena.entity';

export const resenasProviders = [
  {
    provide: 'RESENA_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Resena', ResenaSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
