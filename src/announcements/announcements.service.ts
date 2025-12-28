import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { Announcement } from '../entities/announcement.entity';
import { User } from '../entities/user.entity';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @Inject('ANNOUNCEMENT_REPOSITORY')
    private announcementRepository: typeof Announcement,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto> {
    const whereClause: any = {};

    // Add search functionality - search by title only (case-insensitive)
    if (pageOptionsDto.query) {
      whereClause.title = { [Op.iLike]: `%${pageOptionsDto.query}%` };
    }

    // Add priority filter
    if (pageOptionsDto.priority) {
      whereClause.priority = pageOptionsDto.priority;
    }

    const { rows, count } = await this.announcementRepository.findAndCountAll({
      where: whereClause,
      include: [{ model: User, as: 'createdBy' }],
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['createdAt', pageOptionsDto.order]],
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(rows, true, 'Announcements retrieved successfully', pageMetaDto);
  }

  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.announcementRepository.findOne({
      where: { id },
      include: [{ model: User, as: 'createdBy' }],
    });

    if (!announcement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }

    return announcement;
  }

  async create(createAnnouncementDto: any): Promise<Announcement> {
    const announcement = await this.announcementRepository.create(createAnnouncementDto);
    return announcement;
  }

  async update(id: string, updateAnnouncementDto: any): Promise<Announcement> {
    const announcement = await this.findOne(id);
    await announcement.update(updateAnnouncementDto);
    return announcement;
  }

  async remove(id: string): Promise<void> {
    const announcement = await this.findOne(id);
    await announcement.destroy();
  }
}
