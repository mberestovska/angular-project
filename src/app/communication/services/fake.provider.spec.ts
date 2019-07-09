import { FakeProvider } from './fake.provider';
import { Observer } from 'rxjs';

describe('Fake provider', () => {
    let provider: FakeProvider<any>;

    beforeEach(() => {
        provider = new class extends FakeProvider<any> {
            constructor() {
                super();
                this._delay = 0;
                for (let id = 1; id <= 100; id++) {
                    this._store[id] = { id };
                }
            }
        };
    });

    it('delay works properly', (done) => {
        const delay = 500,
            time = Date.now();

        // @ts-ignore
        provider._delay = delay;

        expect(provider.getItems().subscribe(() => {
            expect(Date.now() - time >= delay).toBe(true);
            done();
        }));
    });

    it('getItems successfully', (done) => {
        expect(provider.getItems().subscribe((items) => {
            expect(items.length > 0).toBe(true);
            done();
        }));
    });

    it('getItemById successfully', (done) => {
        expect(provider.getItemById(1).subscribe((item) => {
            expect(item).toBeTruthy();
            done();
        }));
    });

    it('getItemById error when an id is absent', (done) => {
        expect(provider.getItemById(null).subscribe(expectError(done)));
    });

    it('getItemById error when the object with id not found', (done) => {
        expect(provider.getItemById(-1).subscribe(expectError(done)));
    });

    it('get item by id successfully', (done) => {
        expect(provider.getItemById(1).subscribe((item) => {
            expect(item).toBeTruthy();
            done();
        }));
    });

    it('should be created', (done) => {
        // @ts-ignore
        const id = Object.keys(provider._store).length + 1;

        expect(provider.createItem({}).subscribe((item) => {
            expect(item.id).toBe(id);
            // @ts-ignore
            expect(Object.keys(provider._store).length).toBe(id);
            done();
        }));
    });

    it('should be created an error when an object is absent', (done) => {
        expect(provider.createItem(null).subscribe(expectError(done)));
    });

    it('should be update', (done) => {
        const obj = { id: 1, name: 'test' };

        expect(provider.updateItem(obj).subscribe((data) => {
            expect(data).toBe(obj);
            provider.getItemById(obj.id).subscribe((item) => {
                expect(item.name).toBe(obj.name);
                done();
            });
        }));
    });

    it('should be update an error when an object is absent', (done) => {
        expect(provider.updateItem(null).subscribe(expectError(done)));
    });

    it('should be update an error when an object id is absent', (done) => {
        expect(provider.updateItem({}).subscribe(expectError(done)));
    });

    it('deleteItem successfully', (done) => {
        expect(provider.deleteItem(1).subscribe((item) => {
            expect(item).toBeTruthy();
            done();
        }));
    });

    it('deleteItem error when an id is absent', (done) => {
        expect(provider.deleteItem(null).subscribe(expectError(done)));
    });

    it('deleteItem error when the object with id not found', (done) => {
        expect(provider.deleteItem(-1).subscribe(expectError(done)));
    });
});

export function expectError(done): Observer<any> {
    return {
        error: (error) => {
            expect(error).toBeTruthy();
            done();
        },
        complete: () => {
            throw new Error();
        },
        next: () => {
            throw new Error();
        },
    };
}
