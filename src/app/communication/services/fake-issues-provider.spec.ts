import { TestBed } from '@angular/core/testing';
import { FakeIssuesProvider } from './fake-issues-provider';
import { expectError } from './fake.provider.spec';

describe('Project provider', () => {
    let provider: FakeIssuesProvider;

    beforeEach(() => {
        provider = TestBed.configureTestingModule({
            providers: [
                FakeIssuesProvider,
            ],
        }).get(FakeIssuesProvider);

        provider.generateIssues(1);
    });

    it('getItems with project id work successfully', (done) => {
        expect(provider.getItems(1).subscribe((items) => {
            expect(items.length > 0).toBe(true);
            done();
        }));
    });

    it('service store should be fulfilled', (done) => {
        provider.getItems().subscribe(expectError(done));
    });

    // todo: write tests here
});
