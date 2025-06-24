
import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationDto } from "src/common/dto";
import { StatusTMCTargetDto } from './statusTMCTarget.dto';

export class GetTMCTargetsDto extends IntersectionType(PaginationDto, StatusTMCTargetDto) {}