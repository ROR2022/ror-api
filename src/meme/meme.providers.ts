import { Connection } from 'mongoose';
import { MemeSchema } from './entities/meme.entity';

export const memesProviders = [
  {
    provide: 'MEME_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Meme', MemeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
