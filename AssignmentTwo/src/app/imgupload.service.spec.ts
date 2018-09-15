import { TestBed, inject } from '@angular/core/testing';

import { ImguploadService } from './imgupload.service';

describe('ImguploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImguploadService]
    });
  });

  it('should be created', inject([ImguploadService], (service: ImguploadService) => {
    expect(service).toBeTruthy();
  }));
});
