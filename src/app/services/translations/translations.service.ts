import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpWrapperService } from '../http-wrapper/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  language: 'en' | 'de' = 'de';
  dictionary: { [key: string]: { de?: string, en?: string } } = { };

  dynamicValuesRegex = RegExp(/[^{}]+(?=\})/, 'g');
  trailingDotsRegex = RegExp(/\.$/);
  placeholderRegex = RegExp(/\{\}/);

  constructor(
    private http: HttpWrapperService,
  ) { }

  getTranslations() {
    return this.http.get('translations').pipe(map((result: Translation): Translation => {
      return result;
    }));
  }

  translate(originalText: string): string {
    if(typeof originalText != 'string') {
      return '';
    }
    let translatedText: string = '';

    // remove dynamic values
    let text = originalText.toLowerCase().replace(this.dynamicValuesRegex, '');

    // search dictionary for translation
    let translation = this.dictionary[text] ? this.dictionary[text][this.language] : null;
    if(!translation) {
      text = text.replace(this.trailingDotsRegex, '');
      translation = this.dictionary[text] ? this.dictionary[text][this.language] : null;
    }

    if(translation) {
      translatedText = translation;
    }

    if(!translatedText) {
      translatedText = originalText.replace(this.dynamicValuesRegex, '');
    }

    // attach dynamic values
    let dynamicValues = originalText.match(this.dynamicValuesRegex);
    if(dynamicValues) {
      dynamicValues.forEach(dynamicValue => {
        translatedText = translatedText.replace(this.placeholderRegex, dynamicValue);
      });
    }

    return translatedText;
  }
}

export interface Translation {
  [key: string]: { de: string }
}