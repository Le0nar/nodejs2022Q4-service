import { Artist } from '../entities/artist.entity';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  name: string;
  grammy: boolean;
}
