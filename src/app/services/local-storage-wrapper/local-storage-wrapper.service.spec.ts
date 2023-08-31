import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LocalStorageWrapperService } from './local-storage-wrapper.service';

describe('LocalStorageWrapperService', () => {
  let service: LocalStorageWrapperService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(LocalStorageWrapperService);
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set & get values', () => {
    let value: any;

    value = 'test';
    expect(service.set('testing', 'test')).toBe('"test"');
    expect(localStorage.getItem('testing')).toBe('"test"');
    expect(service.get('testing')).toBe(value);

    value = 123;
    expect(service.set('testing', 123)).toBe('123');
    expect(localStorage.getItem('testing')).toBe('123');
    expect(service.get('testing')).toBe(value);

    value = false;
    expect(service.set('testing', false)).toBe('false');
    expect(localStorage.getItem('testing')).toBe('false');
    expect(service.get('testing')).toBe(value);

    value = [1, 'two', 3];
    expect(service.set('testing', value)).toBe('[1,"two",3]');
    expect(localStorage.getItem('testing')).toBe('[1,"two",3]');
    expect(service.get('testing')).toEqual(value);

    value = {
      one: 1,
      two: 'two'
    };
    expect(service.set('testing', value)).toBe('{"one":1,"two":"two"}');
    expect(localStorage.getItem('testing')).toBe('{"one":1,"two":"two"}');
    expect(service.get('testing')).toEqual(value);
  });

});
