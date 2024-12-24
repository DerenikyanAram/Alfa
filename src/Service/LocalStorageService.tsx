export class LocalStorageService {
    static getData<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    static saveData<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static removeData(key: string): void {
        localStorage.removeItem(key);
    }
}
