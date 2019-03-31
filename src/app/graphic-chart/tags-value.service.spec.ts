import { TestBed } from '@angular/core/testing';

import { TagsValueService } from './tags-value.service';

describe('TagsValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagsValueService = TestBed.get(TagsValueService);
    expect(service).toBeTruthy();
  });
});
