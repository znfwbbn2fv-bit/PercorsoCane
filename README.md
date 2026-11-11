# Percorso Cane — PWA demo 1.0.7

Prima versione dimostrativa per la gestione di percorsi educativi cinofili.

## Funzioni presenti
- Schede cane: anagrafica, contesto familiare, osservazioni emotive, competenze e routine.
- Area educatore e cliente **solo dimostrative** (cambio ruolo senza accesso protetto).
- Calendario disponibilità, richieste appuntamenti con limite locale di 48 ore, conferme e cancellazioni.
- Obiettivi, progressi, diario delle attività e note interne.
- Registro manuale degli stati di pagamento (non vengono elaborati pagamenti).
- Salvataggio sul dispositivo ed esportazione/importazione JSON.
- Installazione PWA su iPhone/iPad e predisposizione all'uso offline.

## Pubblicazione gratuita con GitHub Pages

1. Crea una repository chiamata `PercorsoCane` su GitHub. Se hai GitHub Free e vuoi usare GitHub Pages, impostala **Public**. Non inserire alcun dato reale di clienti nel codice o nella repository.
2. Aggiungi **tutti i file di questa cartella direttamente nella radice** della repository (non caricare soltanto lo ZIP come file): `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `sw.js`, icone, `.nojekyll` e questo `README.md`.
3. Apri **Settings → Pages → Build and deployment**.
4. In **Source**, scegli **GitHub Actions**. Il workflow `.github/workflows/pages.yml` è già configurato e pubblica automaticamente gli aggiornamenti di `main`.
5. Una volta pubblicata, apri `https://<utente>.github.io/PercorsoCane/`.
6. Su iPhone: apri il sito in Safari → Condividi → **Aggiungi alla schermata Home** → **Apri come app web**.
7. Per il test offline: apri l'app online almeno una volta, poi attiva modalità aereo e riaprila. Verifica effettivamente anche backup e ripristino.

La pubblicazione iniziale può richiedere alcuni minuti. Le modifiche caricate nella branch di pubblicazione vengono distribuite attraverso GitHub Pages.

## Privacy e limiti del prototipo

**Non utilizzare dati reali o sensibili per il collaudo.** Questa versione non ha account, autenticazione, permessi di accesso, cifratura dei dati applicativi, sincronizzazione o backup automatico. Chi accede alla pagina può visualizzare l'interfaccia cliente ed educatore sul proprio browser e usare i propri dati salvati localmente. I dati salvati su un iPhone non appaiono automaticamente sugli altri dispositivi.

Il file JSON di backup **non è cifrato**. Le notifiche push/email, gli incassi online e i controlli server-side sulle prenotazioni non sono ancora disponibili.

Per un uso professionale con clienti veri occorrono almeno: backend protetto, autenticazione, autorizzazioni per cliente/professionista, archiviazione e backup sicuri, informativa privacy e misure conformi al GDPR.

## Architettura

Applicazione HTML/CSS/JavaScript senza build. Il service worker e il manifest utilizzano URL relativi, compatibili con la sottocartella `/PercorsoCane/` di GitHub Pages.
## Aggiornamento 1.0.7
Nella Panoramica i riquadri Clienti, Cani, Lezioni future e Da verificare sono pulsanti interattivi. Gli ultimi due aprono le prenotazioni con il filtro pertinente; puoi cambiare filtro anche dall'agenda.

## Correzione 1.0.7 — Safari su iPhone
Su iPhone/iPad i campi `input`, `select` e `textarea` utilizzano una dimensione del testo di almeno 16 px, evitando l'ingrandimento automatico della pagina alla messa a fuoco. Lo zoom manuale resta disponibile per accessibilità. La chiave dei dati locali non cambia.

## Correzione 1.0.7 — Cambio modalità Cliente
Corretto il pulsante Cliente/Educatore su iPhone: il comando viene riconosciuto anche quando l'attributo HTML è senza valore. Il cambio modalità riporta alla Panoramica e alla scheda Anagrafica. La scheda Piano professionale non è disponibile nella vista Cliente. Questa separazione è soltanto dimostrativa e non protegge dati sensibili.

## Correzione 1.0.7 — Tastiera iPhone e navigazione scheda cane
- Su iPhone e iPad l'interfaccia controlla l'area effettivamente visibile mentre si apre la tastiera e scorre per mostrare il campo attivo. La barra inferiore viene nascosta durante l'editing e i modali si adattano all'altezza visibile.
- La barra orizzontale delle tab del cane si riposiziona per mantenere al centro la sezione selezionata, senza cambiare la pagina verticalmente.
- La modifica non cambia la chiave di salvataggio dei dati locali e mantiene lo zoom manuale/accessibile.

## Aggiornamento della versione su iPhone
La pagina HTML richiede `app.js` e `styles.css` con parametro di versione (`?v=1.0.7`) per evitare che il browser conservi i vecchi file. La registrazione del service worker evita la cache HTTP del file `sw.js`. Per aggiornare senza perdere i dati, aprire il sito in Safari e ricaricare la pagina: **non cancellare l'app o i dati del sito senza aver prima esportato un backup JSON**. Per controllare il deployment vedere `Actions → Pubblica Percorso Cane su GitHub Pages` e verificare che il job sia concluso correttamente.

## Correzione 1.0.7 — Accesso ai cani nella demo Cliente
La modalità Cliente mostra sempre un selettore visibile nella barra superiore, anche da iPhone. Se l'educatore ha una scheda cane selezionata, passando a Cliente viene scelto automaticamente il proprietario del cane. La selezione manuale del cliente aggiorna l'elenco dei cani e porta alla Panoramica per la verifica. Questo non introduce account separati: è una simulazione.

## 1.0.7 — Notifiche Dashboard (demo locale)
Le due Dashboard includono un registro notifiche persistente con lettura e conteggio nuove. Gli eventi sono richiesta lezione → educatore; conferma o rifiuto → cliente; segnalazione di pagamento da parte del cliente → educatore; conferma manuale del pagamento da parte dell'educatore → cliente. La segnalazione del cliente non modifica lo stato in Pagato. Le notifiche vengono salvate assieme agli altri dati e incluse nel backup JSON; i vecchi backup restano importabili. Questa implementazione **non sincronizza dispositivi diversi** e **non invia notifiche push**. Per uso reale occorrono autenticazione dei ruoli, database sincronizzato, policy di accesso e notifiche server.
