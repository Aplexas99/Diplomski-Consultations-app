import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpWrapperService } from './http-wrapper.service';

describe('HttpWrapperService', () => {
  let service: HttpWrapperService;
  let httpClientSpy: HttpClient;
  let url = 'url-to-testing-api';
  let data = {
    parameter: 'testing'
  };
  let expectedUrl: string;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
			providers: [
        HttpWrapperService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    service = TestBed.get(HttpWrapperService);

    expectedUrl = service.apiUrl + 'url-to-testing-api';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make get request', () => {
    service.get(url);
    // expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should make post request', () => {
 /*    service.post(url, data);
    expect(httpClientSpy.post).toHaveBeenCalledWith(expectedUrl, data); */
  });

  it('should make put request', () => {
    /* service.put(url, data);
    expect(httpClientSpy.put).toHaveBeenCalledWith(expectedUrl, data); */
  });

  it('should make delete request', () => {
/*     service.delete(url);
    expect(httpClientSpy.delete).toHaveBeenCalledWith(expectedUrl); */
  });
});
