# Hovgårdens Bygg

Lokal arbetskopia av hemsidan på https://hovgardensbygg.se.
Importerad 2026-09-26 från nedladdningen från one.com.

## Redigera och förhandsvisa

Alla publiceringsfiler finns i **site/**. Sidornas texter och gemensamma
HTML-mallar redigeras i `scripts/build-pages.mjs`. Kör `npm run build`
för att skriva ut sidorna till `site/`. Ändringar direkt i genererade
HTML-filer skrivs över nästa gång kommandot körs.
Stilmallen redigeras direkt i `site/styles1.0.css`, mobilmenyn i
`site/site.js` och bilder finns i `site/Bilder/`.

Med Node.js installerat, kör från projektmappen:

```sh
npm run dev
```

Öppna http://127.0.0.1:4173. Servern visar ändringar efter omladdning.
Ingen installation av npm-paket behövs. Förhandsvisningen visar statiska
filer; den kör inte PHP eller one.coms `.htaccess`-regler.
Kontaktformulären använder samma externa tjänst som den publicerade sidan.

Kontrollera lokala länkar och bildsökvägar:

```sh
npm run check
npm test
```

## Spara på GitHub

```sh
git add .
git commit -m "Beskriv ändringen"
git push origin main
```

GitHub: https://github.com/AlbinLund/Hovgardens-bygg

## Publicera manuellt

Ladda upp **innehållet i site/** till webbplatsens rotmapp på one.com.
Själva mappen `site` ska inte bli en undermapp på servern.
Projektets `scripts/`, `package.json` och `.local/` ska inte publiceras.
Ingen automatisk publicering är konfigurerad.

Nedladdningens befintliga one.com-mappar och serverinställningar finns kvar
i `site/`. Den äldre GitHub-versionen finns i Git-historiken och som lokal
kopia i `.local/legacy-github/`. `.local/` skickas inte till GitHub.

Vid importen rättades två befintliga CSS-länkar på sidorna för fönsterbyte
och takläggning från den saknade `styles.css` till `styles1.0.css`.

## Design och integritet, september 2026

Sidorna har gemensam responsiv navigation, nya texter och samma kontaktvägar
som tidigare. Google Analytics, Maps-inbäddningar, externa typsnitt,
Font Awesome och Swiper laddas inte längre. Vanliga externa länkar och
kontaktformulärets befintliga Formspree-adress finns kvar. Webbplatsens
egen kod använder inga nya kakor eller lokal lagring. Åtkomliga gamla
Google Analytics-kakor raderas. Bilderna hämtas från den egna webbplatsen.

`npm test` kontrollerar externa resurser, kakstädning och formulärets
koppling. Testerna skickar inget meddelande till företaget.

Efter publicering behöver serverns faktiska beteende kontrolleras:
one.com kan lägga till egna skript eller svarshuvuden som den lokala
koden inte styr över. Kontrollera i en ny webbläsarsession att inga
icke-nödvändiga kakor sätts, att inga analysanrop görs och att gamla
cachelagrade sidor inte visas. Utan icke-nödvändiga kakor eller liknande
lagring behövs ingen samtyckesbanner för dem.

Senaste cookiegranskningen och publiceringskontrollen finns i
[COOKIE-CHECK.md](COOKIE-CHECK.md). HTML och `.htaccess` innehåller nu CSP
som blockerar externa skript, inbäddningar och bakgrundsanrop. Ladda upp
även den dolda filen `.htaccess`. Formspree-inskickning och vanliga externa
länkar tillåts fortfarande. CSP ersätter inte kontroll av serverkakor.

Ägaren behöver också bekräfta att integritetstexten stämmer med faktisk
hantering av förfrågningar, lagringstider och avtal med one.com/Formspree.
Formsprees befintliga konto, personuppgiftsbiträdesavtal och skydd vid
överföring utanför EU/EES har inte kunnat verifieras här. Detta är en
separat personuppgiftsfråga från cookies. Formulärets leverans behöver
provas av ägaren; ingen testförfrågan har skickats.

Källor: [PTS om kakor](https://www.pts.se/internet-och-telefoni/kakor-cookies/)
och [Formsprees integritetspolicy](https://formspree.io/legal/privacy-policy/).
