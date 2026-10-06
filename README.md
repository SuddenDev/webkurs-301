# Kurs Digitalkompetenz für Fotograf:innen

Diese Website begleitet den Kurs Digitalkompetenz für Fotograf:innen an der Hochschule München, Fakultät 12. Hier findest du Kursmaterialien zur Konzeption, Gestaltung und Umsetzung einer eigenen Portfolio-Website. Die Website basiert auf Astro, Vue und UnoCSS.

**Website:** [kurs.dtampe.com](https://kurs.dtampe.com)

## Aktueller Kursstand

Die Kursinhalte sind für das Wintersemester 2026/27 überarbeitet. Der Kurs umfasst fünf Kapitel:

1. **Grundlagen, Webseitenstruktur und User Experience:** Internet, HTML, CSS und JavaScript, Portfolio-Struktur, responsive Gestaltung und Wireframing.
2. **Figma und UI-Design-Grundlagen:** Frames, Auto Layout, Komponenten, Variablen, Prototyping, Typografie, Raster und Breakpoints.
3. **Coding-Exkurs:** Eine Website mit HTML und CSS aufbauen, mit Media Queries an verschiedene Bildschirmgrößen anpassen und mit JavaScript eine Lightbox ergänzen.
4. **Framer Basics:** Ein Design-System aufsetzen, Navigation und Seiten erstellen, Layouts responsiv gestalten und ein CMS für Portfolio-Projekte nutzen.
5. **Domain, SEO und mehr:** Domains, DNS, Hosting, eigene E-Mail-Adressen, Webanalyse und Suchmaschinenoptimierung.

Webseitenstruktur und User Experience sind Teil des ersten Kapitels; der Coding-Exkurs ist ein eigenes Kapitel. Die Kursbilder und der Zeitplan sind ebenfalls überarbeitet. Das Hauptlayout verwendet Deutsch als Dokumentsprache (`lang="de"`).

Auch die Abhängigkeiten sind aktualisiert, darunter Vue, Sharp, VueUse, ESLint und die Entwicklungswerkzeuge. Die Versionsangaben findest du in `package.json` und die aufgelösten Versionen in `pnpm-lock.yaml`.

## Lokal entwickeln

### Voraussetzungen

- Node.js ab Version 22 laut `package.json`
- pnpm

### Starten

Installiere die Abhängigkeiten und starte den Entwicklungsserver:

```bash
pnpm install
pnpm run dev
```

Anschließend erreichst du die Website unter [localhost:1977](http://localhost:1977). Die Startseite leitet auf die Kursübersicht unter `/course` weiter.

### Verfügbare Befehle

| Befehl | Funktion |
| --- | --- |
| `pnpm run dev` | Startet den Entwicklungsserver auf Port 1977. |
| `pnpm run build` | Erstellt die Website für die Veröffentlichung. |
| `pnpm run preview` | Zeigt dir den zuvor erstellten Build lokal an. |
| `pnpm run lint` | Prüft den Code mit ESLint. |
| `pnpm run lint:fix` | Behebt automatisch korrigierbare ESLint-Probleme. |
| `pnpm run release` | Aktualisiert die Projektversion mit bumpp. |

## Projektstruktur

```text
webkurs-301/
├── src/
│   ├── assets/            # Bilder und Grafiken für die Kursinhalte
│   ├── components/        # Astro- und Vue-Komponenten
│   ├── content/
│   │   ├── course/        # Lektionen als Markdown- oder MDX-Dateien
│   │   └── pages/         # Zusätzliche Inhaltsseiten
│   ├── content.config.ts  # Inhaltssammlungen und deren Schemata
│   ├── layouts/           # Astro-Seitenlayouts
│   ├── pages/             # Seiten und Routen
│   ├── scripts/           # Bildzoom
│   ├── styles/            # Globale Stile und Textformatierung
│   ├── utils/             # Laden und Sortieren der Kursinhalte, Link-Hilfsfunktionen
│   └── site-config.ts     # Metadaten und Navigation
├── astro.config.ts        # Astro-Konfiguration
├── package.json           # Abhängigkeiten und Befehle
├── pnpm-lock.yaml         # Aufgelöste Abhängigkeitsversionen
└── uno.config.ts          # UnoCSS-Konfiguration
```

## Lektionen hinzufügen oder bearbeiten

Lege eine `.md`- oder `.mdx`-Datei in `src/content/course/` an. Verwende eine Nummer am Anfang des Dateinamens, zum Beispiel `06 Meine Lektion.md`: Die Kursübersicht und die Navigation zwischen den Lektionen richten sich nach der alphabetischen Reihenfolge der Inhalts-IDs, nicht nach dem Datum.

Beginne die Datei mit einem YAML-Kopf (Frontmatter):

```markdown
---
title: 06 Meine Lektion
description: Eine kurze Beschreibung der Lektion.
date: 2026-10-06
draft: false
lang: de-DE
---

## Einführung

Hier schreibst du den Inhalt deiner Lektion.
```

Das Schema in `src/content.config.ts` unterstützt folgende Felder:

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | Ja | Titel der Lektion. |
| `date` | Ja | Datum der Lektion. |
| `description` | Nein | Kurze Beschreibung für die Übersicht und die Seitenmetadaten. |
| `draft` | Nein | Mit `true` blendest du die Lektion im Produktionsbuild aus. Standard: `false`. |
| `lang` | Nein | Sprachangabe im Inhaltsschema. Standard: `de-DE`. |
| `image` | Nein | Pfad zu einem Titelbild, zum Beispiel `../../assets/01-cover.jpg`. |
| `slides` | Nein | URL zu Präsentationsfolien, die auf der Lektionsseite verlinkt werden. |
| `redirect` | Nein | Alternatives Linkziel für den Eintrag in der Kursübersicht; öffnet sich in einem neuen Tab. |

Im Entwicklungsserver bleiben Lektionen mit `draft: true` sichtbar. Dateien, deren Name mit `_` beginnt, werden vom Inhaltsloader vollständig ignoriert. So kannst du beispielsweise Kursentwürfe ablegen, ohne sie auf der Website anzuzeigen.

Bilder und Grafiken liegen in `src/assets/`. Auf den Lektionsseiten werden ein Inhaltsverzeichnis aus den Überschriften sowie Links zur vorherigen und nächsten Lektion erzeugt.

Für zusätzliche Inhaltsseiten verwendest du `src/content/pages/`. Dort ist `title` erforderlich; `description` und ein `image`-Objekt mit `src` und `alt` sind optional.

## Gestaltung

Die Website verwendet UnoCSS. In `uno.config.ts` findest du die wiederverwendbaren Gestaltungsklassen:

- **Farben:** `bg-main`, `text-main`, `text-link`, `border-main`
- **Schaltflächen und Links:** `button`, `nav-link`, `prose-link`, `container-link`
- **Schriften:** Inter für Fließtext und Geist Code für Code
- **Symbole:** Phosphor-Symbole über Klassen wie `i-ph-arrow-left`

Die Website unterstützt einen hellen und einen dunklen Darstellungsmodus. Ergänzende Stile liegen in `src/styles/`.

## Technik und Konfiguration

- **Astro 5** erstellt die Seiten und verarbeitet die Inhaltssammlungen.
- **Vue 3** wird für Komponenten wie die Kursübersicht und den Schalter für den Darstellungsmodus verwendet.
- **UnoCSS** liefert die Gestaltungsklassen.
- **Markdown und MDX** bilden die Grundlage der Kursinhalte; mit MDX kannst du Komponenten einbinden.
- **pnpm** verwaltet die Abhängigkeiten; **ESLint** prüft den Code.

Wenn du die Website anpassen möchtest, findest du die wichtigsten Einstellungen hier:

| Datei | Einstellungen |
| --- | --- |
| `src/site-config.ts` | Titel, Beschreibung, Autor, Kontakt und Navigationslinks |
| `src/content.config.ts` | Inhaltssammlungen, Dateifilter und Metadatenfelder |
| `astro.config.ts` | Website-URL, Entwicklungsport, Weiterleitungen und Integrationen für MDX, Vue, Sitemap und UnoCSS |
| `uno.config.ts` | Farben, Schriften, Symbole und wiederverwendbare Gestaltungsklassen |

## Lizenz

Das Projekt steht unter der [MIT-Lizenz](LICENSE).
