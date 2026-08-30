| Feature | Priorität | Zweck |
| --- | --- | --- |
| **Native Write-Guard** | Hoch | Schutz vor Path-Traversal (`../`), Payloads > 50KB und leeren Wipes |
| **Auto-Index (`index.md`)** | Hoch | Spart massiv Tokens beim initialen Kontext-Lookup |
| **Optionales Config-File** | Mittel | `readOnly`, Pfadanpassung und Toggle ohne Neustart |
| **`append_context`** | Mittel | Ergänzen von Abschnitten ohne Komplett-Overwrite |
| **History & Pruning** | Mittel | Rollback-Sicherheit bei versehentlichen Overwrites |
| **CLI `init`-Command** | Normal | Erstellt `.opencontext/`, `index.md` und Starter-Prompts |