import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { checkEntity } from 'src/helpers/check-entity.helper';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  get artistList(): Artist[] {
    return [...this.artists];
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const { grammy, name } = createArtistDto;
    const isCorrectDto =
      typeof name === 'string' && typeof grammy === 'boolean';

    if (!isCorrectDto) {
      throw new BadRequestException(
        'Body does not contain required fields or fields are of the wrong type',
      );
    }

    const artist: Artist = { ...createArtistDto, id: uuidv4() };

    this.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);

    checkEntity(artist, 'Artist', id);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    // TODO: add validate for updateArtistDto's fields

    const index = this.artists.findIndex((artist) => artist.id === id);
    const artist = this.artists[index];

    checkEntity(artist, 'Artist', id);

    const updatedArtist = { ...artist, ...updateArtistDto };

    this.artists[index] = updatedArtist;

    return updatedArtist;
  }

  remove(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    const artist = this.artists[index];

    checkEntity(artist, 'Artist', id);

    this.artists.splice(index, 1);
  }
}
