import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
    WebsiteSettingsService,
    WebsiteSettings,
} from '../../services/website-settings.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about-page.component.html',
    styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
    private websiteSettingsService = inject(WebsiteSettingsService);
    private route = inject(ActivatedRoute);

    websiteSettings: WebsiteSettings | null = null;
    loading = true;
    error: string | null = null;

    ngOnInit() {
        // Check if data was already loaded during SSR
        const resolvedData = this.route.snapshot.data['websiteSettings'];
        if (resolvedData) {
            this.websiteSettings = resolvedData;
            this.loading = false;
        } else {
            // Fallback to client-side loading if SSR didn't work
            this.loadWebsiteSettings();
        }
    }

    private loadWebsiteSettings() {
        this.websiteSettingsService.getSettings().subscribe({
            next: (settings) => {
                this.websiteSettings = settings;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading website settings:', err);
                this.error = 'Erro ao carregar conteúdo da página';
                this.loading = false;
            },
        });
    }

    // Fallback content methods
    getWhoWeAreContent(): string {
        return (
            this.websiteSettings?.aboutWhoWeAre ||
            'A Igreja Apostólica Ministério Cristão Aba Pai, localizada no Rio Grande do Norte (RN), foi fundada em 2004 a partir do chamado de Deus na vida do Pastor Raimundo Feliciano. Somos uma igreja comprometida em compartilhar o amor de Deus e viver conforme os ensinamentos de Jesus Cristo. Mais do que um local de culto, somos uma família unida pela fé, acolhendo todas as pessoas que desejam conhecer mais sobre Deus e experimentar Sua graça transformadora.'
        );
    }

    getOurMissionContent(): string {
        return (
            this.websiteSettings?.aboutOurMission ||
            'Nosso propósito é glorificar a Deus em tudo o que fazemos, proclamando o evangelho de Jesus Cristo e vivendo de maneira que reflita Seu amor. Entendemos que a missão da Igreja vai além das paredes do templo, alcançando os corações daqueles que ainda não conhecem a Cristo e fortalecendo a fé daqueles que já caminham com Ele.'
        );
    }

    getOurValuesContent(): string {
        return (
            this.websiteSettings?.aboutOurValues ||
            '1. Amar a Deus acima de todas as coisas e demonstrar esse amor através do cuidado, respeito e compaixão pelo próximo.\n2. Viver pela fé, confiando plenamente nas promessas de Deus e obedecendo à Sua Palavra.'
        );
    }
}
