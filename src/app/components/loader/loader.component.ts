import { Component, computed, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  readonly size = input(20);

  readonly color = input('#ffffff');

  readonly borderWidth = computed(() => this.size() / 10);

  readonly colorRgb = computed(() => {
    const hexColor = this.color().replace(/^#/, '');

    const red = parseInt(hexColor.substring(0, 2), 16);
    const green = parseInt(hexColor.substring(2, 4), 16);
    const blue = parseInt(hexColor.substring(4, 6), 16);

    return [red, green, blue];
  });

  readonly borderStyle = computed(() => `${this.borderWidth()}px solid rgba(${this.colorRgb().join(',')},0.3)`);
}
