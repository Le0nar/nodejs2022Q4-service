import { Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { Favorite } from './entities/favorite.entity';
import { checkEntity } from 'src/helpers/check-entity.helper';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private tracksService: TracksService,
  ) {}

  private readonly favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private create(entiytyList: any[], favoriteList: any[], id: string) {
    const entity = entiytyList.find((item) => item.id === id);

    checkEntity(entity, 'Item', id);

    favoriteList.push(entity);

    return entity;
  }

  createAlbum(id: string) {
    const { albumList } = this.albumsService;
    return this.create(albumList, this.favorites.albums, id);
  }

  createTrack(id: string) {
    const { trackList } = this.tracksService;
    return this.create(trackList, this.favorites.tracks, id);
  }

  createArtist(id: string) {
    const { artistList } = this.artistsService;
    return this.create(artistList, this.favorites.artists, id);
  }

  findAll() {
    return this.favorites;
  }

  remove(entiytyList: any[], favoriteList: any[], id: string) {
    const index = entiytyList.findIndex((item) => item.id === id);
    const entity = entiytyList[index];

    checkEntity(entity, 'Item', id);

    favoriteList.splice(index, 1);
  }

  removeAlbum(id: string) {
    const { albumList } = this.albumsService;
    return this.remove(albumList, this.favorites.albums, id);
  }

  removeTrack(id: string) {
    const { trackList } = this.tracksService;
    return this.remove(trackList, this.favorites.tracks, id);
  }

  removeArtist(id: string) {
    const { artistList } = this.artistsService;
    return this.remove(artistList, this.favorites.artists, id);
  }
}
