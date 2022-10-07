chapter 3, frame 12

# query

extract `query`

define QueryResult -- closed data -- include count -- can be formatted

`query <args> limit <number>` -- the number of solutions

Option syntax -- the order is required

success and failure as query options

- `query <args> assert success`

- `query <args> assert failure`

`query <args> fuel <number> | infinite` -- the number of steps

- [maybe] default to a finite number

`query <args> debug`

- [maybe] provide step in command line and web

`query <args> return object`

`query <args> return count`
