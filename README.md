# Hovgårdens Bygg

Lokal arbetskopia av hemsidan på https://hovgardensbygg.se.
Importerad 2026-09-26 från nedladdningen från one.com.

## Redigera och förhandsvisa

Alla webbplatsfiler finns i **site/**. Startsidan är `site/index.html`
och den gemensamma stilmallen är `site/styles1.0.css`.
Undersidor finns i `site/Tjanster/` och bilder i `site/Bilder/`.

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
