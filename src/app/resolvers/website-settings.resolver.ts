import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import {
    WebsiteSettingsService,
    WebsiteSettings,
} from '../services/website-settings.service';
import { catchError, of } from 'rxjs';

const FALLBACK_WEBSITE_SETTINGS: WebsiteSettings = {
    id: 0,
    address: 'Rua Adail Pamplona de menezes n°38 Nova Parnamirim, Parnamirim, RN, Brazil',
    phone: '+55 (84) 99830-5218',
    email: 'igrejamcabapai@hotmail.com',
    facebook: 'https://www.facebook.com/igrejaministeriocristaoabapai',
    instagram: 'https://www.instagram.com/igrejamcabapai',
    youtube: 'https://www.youtube.com/@MINIST%C3%89RIOCRIST%C3%83OABAPAI',
    twitter: 'https://x.com/igrejamcabapai',
    whatsapp: '',
    about: '',
    serviceTimes: '',
    aboutWhoWeAre: `<p>A Igreja Apostólica Ministério Cristão Aba Pai, localizada no Rio Grande do Norte (RN), foi fundada em 2004 a partir do chamado de Deus na vida do Pastor Raimundo Feliciano. Somos uma igreja comprometida em compartilhar o amor de Deus e viver conforme os ensinamentos de Jesus Cristo. Mais do que um local de culto, somos uma família unida pela fé, acolhendo todas as pessoas que desejam conhecer mais sobre Deus e experimentar Sua graça transformadora.</p>

<p>Nosso desejo é ser uma igreja viva, que exalte o nome do Senhor em todas as áreas da vida, promovendo a comunhão entre os irmãos e fortalecendo a caminhada cristã de cada membro. Buscamos crescer juntos no conhecimento da Palavra, no amor ao próximo e no serviço ao Reino, confiantes de que Deus nos chamou para sermos luz neste mundo.</p>

<p>Acreditamos que cada pessoa tem um propósito em Cristo e que, por meio da fé, do discipulado e da oração, podemos viver uma vida plena e abundante conforme os planos de Deus. Nossa igreja está de portas abertas para você e sua família. Aqui, você encontrará um ambiente de amor, esperança e transformação.</p>`,
    aboutOurMission: `<p>Nosso propósito é glorificar a Deus em tudo o que fazemos, proclamando o evangelho de Jesus Cristo e vivendo de maneira que reflita Seu amor. Entendemos que a missão da Igreja vai além das paredes do templo, alcançando os corações daqueles que ainda não conhecem a Cristo e fortalecendo a fé daqueles que já caminham com Ele.</p>

<p>Queremos ser uma igreja relevante, que faz a diferença na vida das pessoas e na sociedade, promovendo ações que gerem impacto espiritual, social e emocional. Através da pregação da Palavra, do ensino sólido e de projetos comunitários, buscamos ser um reflexo do amor de Deus, oferecendo apoio, aconselhamento e esperança àqueles que necessitam.</p>

<p>Nosso compromisso é criar um ambiente de crescimento espiritual, onde cada pessoa possa desenvolver um relacionamento profundo com Deus e descobrir seus dons e talentos para servir no Reino. Juntos, queremos cumprir o chamado que Jesus nos deixou: "Ide por todo o mundo e pregai o evangelho a toda criatura" (Marcos 16:15).</p>`,
    aboutOurValues: `<p>1. Amar a Deus acima de todas as coisas e demonstrar esse amor através do cuidado, respeito e compaixão pelo próximo.</p>

<p>2. Viver pela fé, confiando plenamente nas promessas de Deus e obedecendo à Sua Palavra.</p>

<p>3. Buscar diariamente um relacionamento profundo com Deus, dedicando tempo à oração e à leitura das Escrituras.</p>

<p>4. Valorizar e preservar a comunhão entre os irmãos, vivendo em harmonia, edificação mútua e unidade no Corpo de Cristo.</p>

<p>5. Servir com dedicação, alegria e compromisso, utilizando nossos dons e talentos para abençoar vidas e cumprir o propósito de Deus.</p>`,
    weeklyMessageUrl: '',
    weeklyMessageTitle: '',
    weeklyMessageDate: '',
    bankInfo: {
        bank: '403 - Banco Cora SDC',
        agency: '0001',
        account: '4416982-0',
        cnpj: '52.782.534/0001-10',
        name: 'Ministério Cristão Aba Pai',
    },
    pixInfo: {
        type: 'CNPJ',
        key: '52.782.534/0001-10',
        name: 'MINISTÉRIO CRISTÃO ABA PAI',
    },
    maintenanceMode: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

export const websiteSettingsResolver: ResolveFn<WebsiteSettings | null> = () => {
    const websiteSettingsService = inject(WebsiteSettingsService);

    return websiteSettingsService.getSettings().pipe(
        catchError(() => {
            // Return fallback website settings if API call fails
            return of(FALLBACK_WEBSITE_SETTINGS);
        }),
    );
};
