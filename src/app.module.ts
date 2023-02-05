import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { ArtistsModule } from './modules/artists/artists.module';

@Module({
  imports: [UsersModule, TracksModule, ArtistsModule],
})
export class AppModule {}
