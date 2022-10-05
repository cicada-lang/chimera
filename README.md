# Whereabouts

Logic programming with [JSON](https://www.json.org).

In the sense that the syntax is close to JavaScript,
and the query outputs are [JSON lines](https://jsonlines.org).

> I asked the boy beneath the pines. <br/>
> He said, "The master's gone alone <br/>
> Herb-picking, somewhere on the mount, <br/>
> Cloud-hidden, **whereabouts unknown**." <br/>
> -- [Jia Dao](https://en.wikipedia.org/wiki/Jia_Dao)

## Usages

### Online playground

Visit the [Whereabouts Playground](https://whereabouts.cicada-lang.org/playground/RHJpbmsgeyBwZXJzb246ICJqb2huIiwgYWxjb2hvbDogIm1hcnRpbmkiIH0KRHJpbmsgeyBwZXJzb246ICJtYXJ5IiwgYWxjb2hvbDogImdpbiIgfQpEcmluayB7IHBlcnNvbjogInN1c2FuIiwgYWxjb2hvbDogInZvZGthIiB9CkRyaW5rIHsgcGVyc29uOiAiam9obiIsIGFsY29ob2w6ICJnaW4iIH0KRHJpbmsgeyBwZXJzb246ICJmcmVkIiwgYWxjb2hvbDogImdpbiIgfQpEcmluayB7IHBlcnNvbjogImZyZWQiLCBhbGNvaG9sOiAidm9ka2EiIH0KCkZyaWVuZHMgeyBsZWZ0LCByaWdodCwgYWxjb2hvbCB9Ci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB7CiAgRHJpbmsgeyBwZXJzb246IGxlZnQsIGFsY29ob2wgfQogIERyaW5rIHsgcGVyc29uOiByaWdodCwgYWxjb2hvbCB9Cn0KCnF1ZXJ5IGxlZnQgewogIEZyaWVuZHMgeyBsZWZ0LCByaWdodDogIm1hcnkiLCBhbGNvaG9sOiAiZ2luIiB9Cn0).

### Use our server

[**whereabouts-server:**](https://github.com/cicada-lang/whereabouts-server) A server that can run whereabouts code.

Run a file:

```bash
curl https://wa.cic.run --data-binary @docs/tests/clause-and-effect/worksheet-01-party-pairs.wa
```

You can fetch code from a URL, and run:

- We use `curl -s` to disable curl's progress bar.
- All files in [**docs/**](docs/), can be fetched from: `https://docs.wa.cic.run/<path>`, <br/>
  and any other http server that serves `.wa` code would also work.

```bash
curl -s https://docs.wa.cic.run/tests/clause-and-effect/worksheet-01-party-pairs.wa |
curl -s https://wa.cic.run --data-binary @-
```

Run multiline text (bash and zsh):

```bash
curl https://wa.cic.run --data-binary @- << END

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

query left {
  Friends { left, right: "mary", alcohol: "gin" }
}

END
```

The outputs are [JSON lines](https://jsonlines.org) -- one query one line,
You can pipe them to [**jq**](https://stedolan.github.io/jq/) to format them:

```bash
curl -s https://wa.cic.run --data-binary @- << END | jq

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

query left {
  Friends { left, right: "mary", alcohol: "gin" }
}

END
```

### Command line tool

Install it by the following command:

```
npm install -g @cicada-lang/whereabouts
```

The command line program is called `wa`.

Run a file:

```bash
wa run docs/tests/clause-and-effect/worksheet-02-drinking-pairs.wa
```

Run a file and watch file change:

```bash
wa run docs/tests/clause-and-effect/worksheet-02-drinking-pairs.wa --watch
```

Run a URL:

```bash
wa run https://docs.wa.cic.run/tests/clause-and-effect/worksheet-02-drinking-pairs.wa
```

Outputs:

```json
[ "mary", "john", "fred" ]
[ ["mary", "mary"], ["mary", "john"], ["mary", "fred"], ["john", "mary"], ["john", "john"], ["john", "fred"], ["fred", "mary"], ["fred", "john"], ["fred", "fred"] ]
[ ["john", "john", "martini"], ["mary", "mary", "gin"], ["mary", "john", "gin"], ["mary", "fred", "gin"], ["susan", "susan", "vodka"], ["susan", "fred", "vodka"], ["john", "mary", "gin"], ["john", "john", "gin"], ["john", "fred", "gin"], ["fred", "mary", "gin"], ["fred", "john", "gin"], ["fred", "fred", "gin"], ["fred", "susan", "vodka"], ["fred", "fred", "vodka"] ]
```

The outputs are [JSON lines](https://jsonlines.org) -- one query one line,
You can also make use of [**jq**](https://stedolan.github.io/jq/) to format them:

```bash
wa docs/tests/clause-and-effect/worksheet-02-drinking-pairs.wa | jq
```

## Examples

[**worksheet-02-drinking-pairs.wa:**](docs/tests/clause-and-effect/worksheet-02-drinking-pairs.wa)

[ [PLAYGROUND](https://whereabouts.cicada-lang.org/playground/RHJpbmsgeyBwZXJzb246ICJqb2huIiwgYWxjb2hvbDogIm1hcnRpbmkiIH0KRHJpbmsgeyBwZXJzb246ICJtYXJ5IiwgYWxjb2hvbDogImdpbiIgfQpEcmluayB7IHBlcnNvbjogInN1c2FuIiwgYWxjb2hvbDogInZvZGthIiB9CkRyaW5rIHsgcGVyc29uOiAiam9obiIsIGFsY29ob2w6ICJnaW4iIH0KRHJpbmsgeyBwZXJzb246ICJmcmVkIiwgYWxjb2hvbDogImdpbiIgfQpEcmluayB7IHBlcnNvbjogImZyZWQiLCBhbGNvaG9sOiAidm9ka2EiIH0KCkZyaWVuZHMgeyBsZWZ0LCByaWdodCwgYWxjb2hvbCB9Ci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB7CiAgRHJpbmsgeyBwZXJzb246IGxlZnQsIGFsY29ob2wgfQogIERyaW5rIHsgcGVyc29uOiByaWdodCwgYWxjb2hvbCB9Cn0KCnF1ZXJ5IGxlZnQgewogIEZyaWVuZHMgeyBsZWZ0LCByaWdodDogIm1hcnkiLCBhbGNvaG9sOiAiZ2luIiB9Cn0KCnF1ZXJ5IChsZWZ0LCByaWdodCkgewogIEZyaWVuZHMgeyBsZWZ0LCByaWdodCwgYWxjb2hvbDogImdpbiIgfQp9CgpxdWVyeSAobGVmdCwgcmlnaHQsIGFsY29ob2wpIHsKICBGcmllbmRzIHsgbGVmdCwgcmlnaHQsIGFsY29ob2wgfQp9) ]

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

query left {
  Friends { left, right: "mary", alcohol: "gin" }
}

query (left, right) {
  Friends { left, right, alcohol: "gin" }
}

query (left, right, alcohol) {
  Friends { left, right, alcohol }
}
```

We can also use the module system to import from URL:

```js
import { Friends } from "https://docs.wa.cic.run/tests/clause-and-effect/worksheet-02-drinking-pairs.wa"

query left {
  Friends { left, right: "mary", alcohol: "gin" }
}
```

The above example use JSON object, we can also use JSON array.

[**worksheet-03-affordable-journeys.wa:**](docs/tests/clause-and-effect/worksheet-03-affordable-journeys.wa)

[ [PLAYGROUND](https://whereabouts.cicada-lang.org/playground/Qm9yZGVyIFsic3Vzc2V4IiwgImtlbnQiXQpCb3JkZXIgWyJzdXNzZXgiLCAic3VycmV5Il0KQm9yZGVyIFsic3VycmV5IiwgImtlbnQiXQpCb3JkZXIgWyJoYW1wc2hpcmUiLCAic3Vzc2V4Il0KQm9yZGVyIFsiaGFtcHNoaXJlIiwgInN1cnJleSJdCkJvcmRlciBbImhhbXBzaGlyZSIsICJiZXJrc2hpcmUiXQpCb3JkZXIgWyJiZXJrc2hpcmUiLCAic3VycmV5Il0KQm9yZGVyIFsid2lsdHNoaXJlIiwgImhhbXBzaGlyZSJdCkJvcmRlciBbIndpbHRzaGlyZSIsICJiZXJrc2hpcmUiXQoKQWRqYWNlbnQgW3gsIHldCi0tLS0tLS0tLS0tLS0tLS0gYm9yZGVyIHsKICBCb3JkZXIgW3gsIHldCn0KCkFkamFjZW50IFt4LCB5XQotLS0tLS0tLS0tLS0tLS0tIHN5bW1ldHJ5IHsKICBCb3JkZXIgW3ksIHhdCn0KCkFmZm9yZGFibGUgW3gsIHldCi0tLS0tLS0tLS0tLS0tLS0tLS0tIHsKICBBZGphY2VudCBbeCwgel0KICBBZGphY2VudCBbeiwgeV0KfQoKcXVlcnkgdG9fa2VudCB7CiAgQWZmb3JkYWJsZSBbdG9fa2VudCwgImtlbnQiXQp9CgpxdWVyeSB0b19zdXNzZXggewogIEFmZm9yZGFibGUgWyJzdXNzZXgiLCB0b19zdXNzZXhdCn0KCnF1ZXJ5ICh4LCB5KSB7CiAgQWZmb3JkYWJsZSBbeCwgeV0KfQ) ]

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

query to_kent {
  Affordable [to_kent, "kent"]
}

query to_sussex {
  Affordable ["sussex", to_sussex]
}

query (x, y) {
  Affordable [x, y]
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

To make a contribution, fork this project and create a pull request.

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
