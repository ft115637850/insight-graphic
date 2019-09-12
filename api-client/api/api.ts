export * from './background.service';
import { BackgroundService } from './background.service';
export * from './resolution.service';
import { ResolutionService } from './resolution.service';
export * from './tag.service';
import { TagService } from './tag.service';
export * from './token.service';
import { TokenService } from './token.service';
export const APIS = [BackgroundService, ResolutionService, TagService, TokenService];
