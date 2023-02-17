import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('album/:id')
  createAlbum(@Param('id') id: string) {
    return this.favoritesService.createAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artists/:id')
  creatArtist(@Param('id') id: string) {
    return this.favoritesService.createArtist(id);
  }

  @Delete('artists/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Post('track/:id')
  createTrack(@Param('id') id: string) {
    return this.favoritesService.createTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }
}
