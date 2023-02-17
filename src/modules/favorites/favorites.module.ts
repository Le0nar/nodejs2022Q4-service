import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [AlbumsModule, ArtistsModule, TracksModule],
})
export class FavoritesModule {}
