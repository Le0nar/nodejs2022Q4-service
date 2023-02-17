import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { checkEntity } from 'src/helpers/check-entity.helper';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  get trackList() {
    return [...this.tracks];
  }

  create(createTrackDto: CreateTrackDto): Track {
    const { name, albumId, artistId, duration } = createTrackDto;
    const isCorrectDto =
      typeof name === 'string' &&
      typeof duration === 'number' &&
      (typeof albumId === 'string' || albumId === null) &&
      (typeof artistId === 'string' || artistId === null);

    if (!isCorrectDto) {
      throw new BadRequestException(
        'Body does not contain required fields or fields are of the wrong type',
      );
    }

    const track: Track = { ...createTrackDto, id: uuidv4() };

    this.tracks.push(track);

    return track;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);

    checkEntity(track, 'Track', id);

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    // TODO: add validate for update dto's fields

    const index = this.tracks.findIndex((track) => track.id === id);
    const track = this.tracks[index];

    checkEntity(track, 'Track', id);

    const updatedTrack = { ...track, ...updateTrackDto };

    this.tracks[index] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    const track = this.tracks[index];

    checkEntity(track, 'Track', id);

    this.tracks.splice(index, 1);
  }
}
