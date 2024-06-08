<h3 align="center">Distribute seats in rows for electorial graph</h3>

## 📝 Table of Contents

- [About](#about)
- [Running](#running)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

My line of thinking for calculating this was as follows:

<ol>
<li>If I want to have spacing between rows and seats as even as possible I need to calculate suitable row count. I did this with iterativly calculating total amount of seats I can place with same spacing by which rows are separated into circumference of each row.</li>
<li>When total allocated seats number exceeds initial variable of totalSeats - I compare previous and current amount of placed seats. Number closer to totalSeats is our precise number of rows I need to have.</li>
<li>After getting suitable number of rows, I need to place unplaced seats or remove overplaced seats. I do this by calculating total space per one seats in row - removing seats from rows with narrowest space/seat and placing seats into rows with largest space/seat.</li>
<li>This approach should give me row and seats placement in which spacing between them is as accurate as possible for amount of seats needed to be placed in graph with provided dimension.</li>
</ol>

### Running <a name = "running"></a>

To run the script:

```
npm run distribute
```

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@anadreth](https://github.com/anadreth) - Miroslav Vano
