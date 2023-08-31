import { TranslationsService } from './translations.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

	constructor(public translationsService: TranslationsService) {}

  transform(originalText: string): string {
    return this.translationsService.translate(originalText);
  }

}
