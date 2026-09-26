# GitHub till one.com via SFTP

Server: `ssh.cdb5s664g.service.one`, användare: `cdb5s664g_ssh`, port: `22`.
SSH-terminalåtkomst behövs inte. Workflow använder SFTP.

## Förberedelser i GitHub

I repots Settings → Secrets and variables → Actions:

1. Under Secrets, skapa `ONECOM_SFTP_PASSWORD` med SFTP-lösenordet.
2. Skapa `ONECOM_KNOWN_HOSTS` med serverns verifierade offentliga SSH-värdnyckel i known_hosts-format. Nyckeln/fingeravtrycket ska jämföras med uppgift från one.com eller en tidigare betrodd anslutning innan den läggs in. Enbart ssh-keyscan verifierar inte serverns identitet. Skriptet accepterar inte okända servernycklar automatiskt.
3. Vänta med variablerna nedan tills anslutningen har kontrollerats.

Lösenordet ska aldrig finnas i koden, chatten eller en workflow-logg.

## Kontrollera anslutningen utan publicering

Öppna Actions → one.com SFTP → Run workflow, välj `main` och `inspect`.
Körningen visar aktuell SFTP-mapp och dess filer. Den ändrar inget på servern.
Kontrollera vilken mapp som innehåller webbplatsens befintliga index.html,
Kontakt.html och Tjanster. SFTP-sökvägar kan skilja sig från File Manager
och SSH-sökvägar; gissa inte målmappen.

## Första publiceringen

1. Ta/spara en aktuell säkerhetskopia av befintliga webbplatsfiler.
2. Under Variables, ange `ONECOM_REMOTE_DIR` till den verifierade absoluta
   sökvägen. Kör `inspect` igen för att bekräfta rätt filer i målmappen.
3. Kör workflow manuellt med `deploy`. Detta skriver över motsvarande filer
   med innehållet i `site/`, inklusive `.htaccess`. Filer som bara finns på
   servern raderas inte. Uppladdningen är inte atomisk: vid ett fel kan vissa
   filer redan vara uppdaterade. Kör om eller återställ från säkerhetskopian.
4. Kontrollera hemsidan och cookiebeteendet enligt COOKIE-CHECK.md.
5. Aktivera först därefter variabeln `ONECOM_AUTO_DEPLOY` med värdet `true`.
   Då publiceras framtida pushar till main när kontrollerna har passerat.

Ta bort variabeln eller sätt den till `false` för att stänga av automatiken.
Manuella körningar är fortfarande möjliga. Ingen automatisk publicering
aktiveras av att enbart lägga in lösenordet.

De lokala testerna verifierar kommandogenerering och spärrar. Anslutning,
målmapp, uppladdning och serverregler måste verifieras på den riktiga servern.
