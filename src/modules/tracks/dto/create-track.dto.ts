import { Track } from '../entities/track.entity';

export class CreateTrackDto implements Omit<Track, 'id'> {
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
