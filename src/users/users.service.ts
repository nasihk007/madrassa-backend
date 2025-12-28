import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { User } from '../entities/user.entity';
import { PageOptionsDto, CommonDataResponseDto, PageMetaDto } from '../shared/dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<CommonDataResponseDto> {
    const whereClause: any = {};

    if (pageOptionsDto.query) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${pageOptionsDto.query}%` } },
        { email: { [Op.like]: `%${pageOptionsDto.query}%` } },
      ];
    }

    const { rows, count } = await this.userRepository.findAndCountAll({
      where: whereClause,
      limit: pageOptionsDto.takeOrLimit,
      offset: pageOptionsDto.skip,
      order: [['createdAt', pageOptionsDto.order]],
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count,
    });

    return new CommonDataResponseDto(rows, true, 'Users retrieved successfully', pageMetaDto);
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;

    await user.update(userData);
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user) {
      await user.destroy();
    }
  }
}
