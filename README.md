# Cicada Whereabouts

Logic programming with JSON.

> I asked the boy beneath the pines. <br/>
> He said, "The master's gone alone <br/>
> Herb-picking, somewhere on the mount, <br/>
> Cloud-hidden, **whereabouts unknown**." <br/>
> -- [Jia Dao](https://en.wikipedia.org/wiki/Jia_Dao)

## Install

```
npm install -g @cicada-lang/cicada-whereabouts
```

The command line program is called `whereabouts`:

Example usage:

```
whereabouts docs/tests/clause-and-effect/worksheet-02-drinking-pairs.cw
```

You can also make use of [**jq**](https://stedolan.github.io/jq/):

```
whereabouts docs/tests/clause-and-effect/worksheet-02-drinking-pairs.cw | jq
```

The content of [worksheet-02-drinking-pairs.cw](docs/tests/clause-and-effect/worksheet-02-drinking-pairs.cw) is:

```js
Drink { person: "john", alcohol: "martini" }
Drink { person: "mary", alcohol: "gin" }
Drink { person: "susan", alcohol: "vodka" }
Drink { person: "john", alcohol: "gin" }
Drink { person: "fred", alcohol: "gin" }
Drink { person: "fred", alcohol: "vodka" }

Friends { left, right, alcohol }
------------------------------------ {
  Drink { person: left, alcohol }
  Drink { person: right, alcohol }
}

query (left) {
  Friends { left, right: "mary", alcohol: "gin" }
}
```

The above example use JSON object, we can also use JSON array.

Like in [worksheet-03-affordable-journeys.cw](docs/tests/clause-and-effect/worksheet-03-affordable-journeys.cw):

```js
Border ["sussex", "kent"]
Border ["sussex", "surrey"]
Border ["surrey", "kent"]
Border ["hampshire", "sussex"]
Border ["hampshire", "surrey"]
Border ["hampshire", "berkshire"]
Border ["berkshire", "surrey"]
Border ["wiltshire", "hampshire"]
Border ["wiltshire", "berkshire"]

Adjacent [x, y]
---------------- border {
  Border [x, y]
}

Adjacent [x, y]
---------------- symmetry {
  Border [y, x]
}

Affordable [x, y]
-------------------- {
  Adjacent [x, z]
  Adjacent [z, y]
}

query (to_kent) {
  Affordable [to_kent, "kent"]
}
```

Please see [docs/tests](docs/tests) for more examples.

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
npm run test          # Run test
npm run test:watch    # Watch the testing
```

## Contributions

> **Be polite. Do NOT bring negative emotion to others.**

To make a contribution,
[fork this project](https://github.com/cicada-lang/cicada/fork)
and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

It is assumed that all non draft PRs are ready to be merged.
If your PR is not ready to be merged yet, please make it a draft PR:

- [Creating draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests)
- [Changing a PR to draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request)

During the development of your PR, you can make use of
the [TODO.md](TODO.md) file to record ideas temporarily,
and this file should be clean again at the end of your development.

## License

[GPLv3](LICENSE)
