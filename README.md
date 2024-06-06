# FMI_TW_CV

Minimalist, minimal project for Web class.

## Rulare:
Rularea se face cu nodeJS:

`npm install` -> instaleaza dependentele node.

`node index.js` -> porneste serverul ( de fapt am folosit `nodemon index.js` pt instant reloading dar s-ar putea sa necesite niste setup si n-are rost daca nu modifici codul)

`localhost:5000` -> accesabil in browser

## Rezolvare feedback proiect 1:

1. foarte puțin conținut -> adaugat jocul in sine si o introducere.
2. Meniul e cam simplu și el -> adaug niște reguli css astfel încât să fie clar când trecem cu mouse-ul peste un element din meniu. 
3. să folosești pe cât posibil doar unități de măsură relative pentru un design responsive. -> designul inca are si unitati fixe (px), insa este responsive, folosind multe relative (vh,vw,rem,%), cat si media queries pe about page.
4. Apoi, în general nu e o idee bună să folosim perechea de culori roșu/verde, pentru că 40% din persoanele de sex masculin sunt daltoniste. Încearcă pe viitor să folosești altă paletă cromatică -> am ales alte palete cromatice, tot dupa ochi, dar nu rosu-verde (ci negru-alb, verde-mov, verde-rozuliu).

## Cerințe generale minimale pentru partea 2 (JavaScript + Node.js misc):

A. JavaScript
- &#9745; fișier separat pentru codul JavaScript -> evident
- &#9745; modificarea stilului unui element sau al unui grup de elemente -> footer.js
- &#9745; manipularea DOM-ului (selectare după id, tag, clasă, folosind selectori CSS) -> footer.js
- &#9745; crearea și stergerea de elemente HTML -> creare buton footer.js, stergere inamic game.js
- &#9745; folosirea și modificarea evenimentelor generate de mouse si tastatură -> game.js (pauses on mouse outside page)
- &#9745; modificare de proprietăți -> footer.js
- &#9745; inputuri funcționale (de exemplu: input de tip text/range/number/radio/checkbox, select, textarea) -> logic.js
- &#9745; folosirea setTimeout sau setInterval -> game.js
- &#9745; folosirea localStorage (să se pastreze în localStorage o colecție de elemente) -> logic.js
- &#9745; folosirea a cel puțin unei metode din clasele: Math, Array, String, Date -> logic.js (String.charCodeAt,Math.min)
- &#9745; schimbarea aleatoare a valorilor unei proprietăți (de exemplu: culoare, dimensiuni, poziție) -> aparitie random inamici game.js
- &#9745; folosirea proprietăților classList, target sau currentTarget -> classList in form.js listener pentru increase
- &#9745; folosirea metodelor getComputedStyle, stopPropagation -> getComputedStyle in game.js to get width.
- &#9745; validarea datelor dintr-un formular folosind expresii regulate -> logic.js

B. AJAX & Node.js
- &#9745; cereri get/post: preluare date dintr-un formular -> index.js
- &#9745; cereri Ajax cu preluare date dintr-un fișier json -> index.js
- &#9745; sesiuni: login/logout (cu Node.js sau Storage) -> index.js
- &#9745; pagină pentru eroarea 404 -> 404.html (and css,js)