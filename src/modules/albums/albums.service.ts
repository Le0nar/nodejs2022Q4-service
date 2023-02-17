import { BadRequestException, Injectable } from '@nestjs/common';
import { checkEntity } from 'src/helpers/check-entity.helper';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  // TODO: rename to _albums, albums
  private readonly albums: Album[] = [];

  get albumList(): Album[] {
    return [...this.albums];
  }

  create(createAlbumDto: CreateAlbumDto) {
    const { artistId, name, year } = createAlbumDto;
    const isCorrectDto =
      typeof name === 'string' &&
      typeof year === 'number' &&
      (typeof artistId === 'string' || artistId === null);

    if (!isCorrectDto) {
      throw new BadRequestException(
        'Body does not contain required fields or fields are of the wrong type',
      );
    }

    const album: Album = { ...createAlbumDto, id: uuidv4() };
    this.albums.push(album);
    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);

    checkEntity(album, 'Album', id);

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    // TODO: add validate for update dto's fields

    const index = this.albums.findIndex((album) => album.id === id);
    const album = this.albums[index];

    checkEntity(album, 'Album', id);

    const updatedTrack = { ...album, ...updateAlbumDto };

    this.albums[index] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const index = this.albums.findIndex((track) => track.id === id);
    const album = this.albums[index];

    checkEntity(album, 'Album', id);

    this.albums.splice(index, 1);
  }
}
