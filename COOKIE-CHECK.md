# Cookiekontroll – 26 september 2026

Omfattning: cookies och liknande lagring vid besök på webbplatsen. Detta är en teknisk kontroll mot PTS vägledning, inte en garanti för all juridisk efterlevnad.

## Publicerad version: inte åtgärdad ännu

Den publika sidan på one.com är fortfarande den äldre versionen. Följande tre adresser kontrollerades med HTTP-hämtning:

- https://hovgardensbygg.se/index.html
- https://hovgardensbygg.se/Kontakt.html
- https://hovgardensbygg.se/Tjanster/Nybyggnation.html

Alla tre innehöll Google Analytics och en Google Maps-inbäddning. Ingen samtyckesstyrning hittades i den hämtade koden. Startsidan kontrollerades också i webbläsaren: Analytics-skriptet och det ovillkorliga anropet `gtag("config", "G-6M7FV9DL6S")` fanns i dokumentet, liksom Google Maps-inbäddningen. Ingen samtyckesdialog visades. Därför bedöms denna version inte som ett godkänt cookieupplägg.

De tre HTML-svaren innehöll inga Set-Cookie-headerfält. Det utesluter inte kakor som senare skapas av JavaScript eller tredjepartsresurser. En fullständig inventering av alla kakor i webbläsaren har inte gjorts.

## Ny lokal version: rättad och testad

- Analytics, kartinbäddningar och automatiska externa resursladdningar är borttagna.
- Webbplatsens JavaScript skapar ingen ny cookie eller lokal/sessionbaserad lagring. Åtkomliga gamla Analytics-kakor tas bort.
- CSP i HTML och `.htaccess` begränsar resurser till webbplatsens egen origin och blockerar externa skript, iframes och bakgrundsanrop. Vanliga externa länkar och befintlig Formspree-inskickning är tillåtna.
- Fyra integritetstester passerade, inklusive externa resurser, kakstädning, CSP och kontaktformulärets koppling. Inget formulär skickades.
- Startsidan laddades med CSP i webbläsaren: lokal meny fungerade, bilder laddades och inga konsolfel registrerades.

CSP är ett kompletterande skydd. Det hindrar inte webbservern från att sätta cookies via HTTP-headerfält och garanterar inte att framtida lokala skript är spårningsfria.

## Publicering och återstående kontroll

1. Ladda upp innehållet i `site/`, inklusive den dolda filen `.htaccess`, enligt det manuella arbetsflödet. Alla nya HTML-filer, CSS och `site.js` ska ersätta motsvarande filer på one.com.
2. Kontrollera därefter den publicerade versionen i en ren webbläsarsession: lagrade cookies, lokal lagring och nätverksanrop före någon interaktion samt efter navigation mellan sidor.
3. Kontrollera att one.com levererar den nya HTML-koden, att inga gamla analyser eller kartinbäddningar återkommer och att gamla cachelagrade versioner inte visas.
4. Kontrollera eventuella serverkakor från one.com. Om någon finns ska ändamål och samtyckesbehov bedömas och cookieinformationen uppdateras. Skyddet i `.htaccess` kan bara bekräftas efter publicering; HTML-skyddet fungerar även när servermodulen saknas.

En banner behövs inte för icke-nödvändiga kakor som inte används. Om sådan lagring senare införs måste den hållas avstängd tills ett giltigt samtycke lämnats, med likvärdiga möjligheter att neka och återkalla.

Källa: [PTS: Kakor (cookies)](https://www.pts.se/internet-och-telefoni/kakor-cookies/), kontrollerad 26 september 2026.

Ingen ändring har gjorts på one.com. Kontaktformuläret och företagets personuppgiftsrutiner har inte ändrats i denna cookiegranskning.
