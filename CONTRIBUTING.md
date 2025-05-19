# Zasady współpracy w projekcie

W tym projekcie stosujemy śledzenie wersji kodu przy pomocy **Git** i **GitHub**. Celem jest zorganizowana, przejrzysta i bezpieczna współpraca przy zachowaniu wysokiej jakości kodu.

---

## 🔀 Branching i workflow

### Tworzenie nowego feature'a lub naprawy błędu

1. Przejdź na aktualną wersję `dev`:
   ```bash
   git checkout dev
   git pull
   ```
2. Utwórz nowy branch:
   - Nowy feature: `feature/<clickup_task_id>-<description>`
   - Naprawa błędu: `fix/<clickup_task_id>-<description>`
   - Poprawa kodu: `refactor/<clickup_task_id>-<description>`
     Przykład:
   ```bash
   git checkout -b feature/86c3cxcn2-changes-in-code
   ```
   Pozwoli to na wygodniejszą pracę z Gitem w klientach GUI (GitKraken, Github Desktop, itp)
3. Twórz zmiany w kodzie, dodawaj commity zgodnie z zasadami niżej.

4. Wypchnij kod:
   ```bash
   git push origin <twoj_branch>
   ```
5. Utwórz **Pull Request** do `dev`. Nazwa PR to nazwa taska, do którego odnosi się ten PR. Użyj szablonu PR do opisu zmian (powinien dodać się automatycznie).
6. Dodaj przynajmniej jednego recenzenta. Po zatwierdzeniu scal PR do `dev`.

---

## ✅ Commity

- Używaj **języka angielskiego**, czasu **Present Simple**.
- Stosuj [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
  Przykłady:
  ```
  feat: Add login form to /auth route
  fix: Correct wrong validation in form
  refactor: Simplify email validation logic
  ```
- Pojedynczy commit powinien dotyczyć około 2-5 plików. W pewnych przypadkach, np refactoringu, może być więcej plików. Chodzi o to, aby jeden PR nie był zbyt duży - ułatwi to sprawdzanie podczas code review.

---

## 📦 Pull Requesty

Nazwa pull requesta powinna być **nazwą taska do którego odnosi się ten PR.** Tworzy to schludny commit oraz zawiera ID taska, co wyróżnia commit wśród innych.

Opis zmian w pull requestach powinien korzystać z poniższego szablonu:

```markdown
#### Changes
<!-- Short description of what has changed -->

#### Related tasks
- ClickUp: [XXXXXXXXX](https://app.clickup.com/t/XXXXXXXXX)

#### Comments
<!-- Information how to test or any additional info -->
none

```

---

## 🧪 Dobre praktyki

- Regularnie aktualizuj swojego brancha `dev` (`git pull`).
- Unikaj ogromnych PR — łatwiej je przetestować i zrecenzować.
- Przed merge sprawdź, czy nie pojawiły się konflikty.
- W razie konfliktu kontaktuj się z osobą odpowiedzialną za kod (blame na github), który powoduje konflikt, albo zmień swój kod tak, aby tych konfliktów nie powodował.
