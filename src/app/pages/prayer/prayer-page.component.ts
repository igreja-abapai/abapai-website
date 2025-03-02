import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../../components';
import { PrayerRequest } from '../../repository/prayer-request/prayer-request.entity';
import { PrayerRequestRepository } from '../../repository/prayer-request/prayer-request.repository';

@Component({
    selector: 'app-prayer',
    standalone: true,
    imports: [ReactiveFormsModule, LoaderComponent],
    providers: [PrayerRequestRepository],
    templateUrl: './prayer-page.component.html',
    styleUrl: './prayer-page.component.scss',
})
export class PrayerPageComponent {
    repository = inject(PrayerRequestRepository);

    isLoading = false;

    readonly formGroup = new FormGroup({
        name: new FormControl<string>('', [Validators.required]),
        phone: new FormControl<string>(''),
        area: new FormControl(''),
        request: new FormControl('', [Validators.required]),
    });

    onSubmit() {
        if (this.formGroup.invalid) {
            return;
        }

        this.isLoading = true;

        const formData = this.formGroup.value as PrayerRequest;

        return this.repository.createPrayerRequest(formData).subscribe(() => {
            this.isLoading = false;
            this.formGroup.reset();
        });
    }
}
