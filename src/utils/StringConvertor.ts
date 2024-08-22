export class StringConvertor {
    static convertCamelCaseToSnakeCaseRecursive(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map((item) => this.convertCamelCaseToSnakeCaseRecursive(item));
        }
    
        if (obj !== null && typeof obj === 'object') {
            const snakeCaseObj: any = {};
            for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (obj[key] !== undefined) {
                const value = obj[key];
                const snakeCaseKey = key.replace(
                    /[A-Z]/g,
                    (letter) => `_${letter.toLowerCase()}`,
                );
                snakeCaseObj[snakeCaseKey] = this.convertCamelCaseToSnakeCaseRecursive(value);
                }
            }
            }
            return snakeCaseObj;
        }
    
        return obj;
    }
}