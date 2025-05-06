# Zasady współpracy w projekcie

W tym projekcie stosujemy wersjonowanie kodu przy pomocy **Git** i **GitHub**. Celem jest zorganizowana, przejrzysta i bezpieczna współpraca przy zachowaniu wysokiej jakości kodu.

---

## 🔀 Branching i workflow

### Tworzenie nowego feature'a lub naprawy błędu

1. Przejdź na aktualną wersję `dev`:
   ```bash
   git checkout dev
   git pull
   ```
2. Utwórz nowy branch:
   - Nowy feature: `ft-<clickup_task_id>`
   - Naprawa błędu: `fx-<clickup_task_id>`
     Przykład:
   ```bash
   git checkout -b ft-86c3cxcn2
   ```
3. Twórz zmiany w kodzie, dodawaj commity zgodnie z zasadami niżej.
4. Przed wysłaniem PR zaktualizuj branch:
   ```bash
   git fetch origin
   git rebase origin/dev
   ```
5. Wypchnij kod:
   ```bash
   git push origin <twoj_branch>
   ```
6. Utwórz **Pull Request** do `dev`. Użyj szablonu PR (powinien dodać się automatycznie).
7. Dodaj dwóch recenzentów. Po zatwierdzeniu scal PR do `dev`.

---

## ✅ Commity

- Używaj **języka angielskiego**, czasu **Present Simple**.
- Stosuj [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)::
  Przykłady:
  ```
  feat: Add login form to /auth route
  fix: Correct wrong validation in form
  refactor: Simplify email validation logic
  ```
- Pojedynczy commit powinien dotyczyć około 2-3 plików. W pewnych przypadkach, np refactoringu, może być więcej plików. Chodzi o to, aby jeden PR nie był zbyt duży - ułatwi to sprawdzanie

---

## 📦 Pull Requesty

Pull Requesty powinny korzystać z poniższego szablonu:

```markdown
#### Changes

<!-- Short description of what has changed -->

#### Related tasks

<!-- For example -->

- ClickUp: [XXXXXXXXX](https://app.clickup.com/t/XXXXXXXXX)

#### Comments

<!-- Information how to test or any additional info -->
```

---

## 🧪 Dobre praktyki

- Regularnie aktualizuj swojego brancha (`git pull/rebase`).
- Unikaj ogromnych PR — łatwiej je przetestować i zrecenzować.
- Przed merdżem sprawdź, czy nie pojawiły się konflikty.
