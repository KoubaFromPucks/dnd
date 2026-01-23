# GIT
Verzovací platforma pro správu SW. Obecně platí, že commity by měly být co nejmenší. Pokud udělám malou změnu, hned ji commitnu. To je fajn, aby bylo možné se kdyžtak vrátit o commit zpět.

Nikdy prosím nedávejte nic přímo do větve main, vždycky z nové větve.

Pro mergování používejte PR (Pull request) - to naleznete zde: ![image](./pictures/PR.png)

# Instalace
Pro práci doporučuji nainsatlovat:
- Git GUI - ovládání gitu
- Visual Studio Code - textový editor pro úpravu kódu
- pnpm - správce react balíčků
- next.js - framework, ve kterém pracujeme
- node.js - Runtime prostředí pro spouštění

# Ovládání buildu
Vždy musíte mít cwd v root složce:
Pro překlad a spuštění aplikace zadej do CMD `pnpm dev`
Pro autoamtickou opravu kódu (formátování): `pnpm format`
Pro upozornění na chyby, které se budou kontrolovat při buildu: `pnpm lint:fix`

# Ovládání Gitu
Základní ovládání

## Když chci něco začít dělat - vytvořím větev
1. Přepnout větve main - `git checkout main`
2. Aktualizace větve - `git pull`
3. Vytvořit novou větev - `git checkout -b <jmeno vetve>` 

## chci dát změny na GIT
1. Označím změny - `git add <cesta k souboru 1> <cesta k souboru 1>` pokud chci přidat všechny soubory, stačí `git add .`
2. Commit - `git commit -m "<Popis zmen>"`
3. Dát změny na sdílený repozitář (aby ostatní mohli aktualizovat soubory skrze `git pull`) - `git push`

## Aktualizace větve
1. Checkout na větev, na kterou se chci aktualizovat - `git checkou <jmeno-vetve>`
2. Aktualizace `git pull`

## Pokud jsou konflikty před mergem v PR
Je potřeba je vyřešit a až poté mergnout.

1. `git checkout main`
2. `git pull`
3. `git checkout <moje vetev>`
4. `git rebase main` - vyřešíte konflikty (ideálně ve VS)
5. `git push --force`

## Chci vrátit mnou provedené změny na poslední commit
`git reset --hard HEAD`

## Chci vrátit změny na předposlední commit 
`git reset --hard HEAD~2`

Pokud budu chtít, aby se změny projevili i na githubu, zadej ještě:
`git push --force`

## Přidal jsem soubor pomocí git add, ale chci to vrátit
`git restore --staged <cesta k souboru>`

## Chci vrátit změny u jednoho souboru na verzi, než jsem ho upravil
`git restore <cesta k souboru>`