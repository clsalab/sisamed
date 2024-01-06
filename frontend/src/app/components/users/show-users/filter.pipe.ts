import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items || !searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();

        return items.filter(item =>
            Object.values(item).some(val => {
                if (Array.isArray(val)) {
                    // Si es una matriz, conviértela a cadena y verifica
                    return val.map(String).some(strVal => strVal.toLowerCase().includes(searchText));
                } else {
                    // Si no es una matriz, verifica normalmente
                    return (typeof val === 'string' || val instanceof String) && val.toLowerCase().includes(searchText);
                }
            })
        );
    }
}
