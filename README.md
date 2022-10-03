# Cicada Whereabouts

Logic programming with [JSON](https://www.json.org).

In the sense that the syntax is close to JavaScript,
and the query outputs are [JSON lines](https://jsonlines.org).

> I asked the boy beneath the pines. <br/>
> He said, "The master's gone alone <br/>
> Herb-picking, somewhere on the mount, <br/>
> Cloud-hidden, **whereabouts unknown**." <br/>
> -- [Jia Dao](https://en.wikipedia.org/wiki/Jia_Dao)

## Usage

### Online playground

Visit the [Cicada Whereabouts Playground](https://whereabouts.cicada-lang.org/playground/RHJpbmsgeyBwZXJzb246ICJqb2huIiwgYWxjb2hvbDogIm1hcnRpbmkiIH0KRHJpbmsgeyBwZXJzb246ICJtYXJ5IiwgYWxjb2hvbDogImdpbiIgfQpEcmluayB7IHBlcnNvbjogInN1c2FuIiwgYWxjb2hvbDogInZvZGthIiB9CkRyaW5rIHsgcGVyc29uOiAiam9obiIsIGFsY29ob2w6ICJnaW4iIH0KRHJpbmsgeyBwZXJzb246ICJmcmVkIiwgYWxjb2hvbDogImdpbiIgfQpEcmluayB7IHBlcnNvbjogImZyZWQiLCBhbGNvaG9sOiAidm9ka2EiIH0KCkZyaWVuZHMgeyBsZWZ0LCByaWdodCwgYWxjb2hvbCB9Ci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB7CiAgRHJpbmsgeyBwZXJzb246IGxlZnQsIGFsY29ob2wgfQogIERyaW5rIHsgcGVyc29uOiByaWdodCwgYWxjb2hvbCB9Cn0KCnF1ZXJ5IChsZWZ0KSB7CiAgRnJpZW5kcyB7IGxlZnQsIHJpZ2h0OiAibWFyeSIsIGFsY29ob2w6ICJnaW4iIH0KfQ).

### Use our server

[**cicada-whereabouts-server:**](https://github.com/cicada-lang/cicada-whereabouts-server) A server that can run whereabouts code.

Run a file:

```bash
curl https://api.whereabouts.cicada-lang.org/run \
  -d @docs/tests/clause-and-effect/worksheet-01-party-pairs.cw
```

Run multiline text (bash and zsh):

```bash
curl https://api.whereabouts.cicada-lang.org/run -d @- <<END

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

END
```

The outputs are [JSON lines](https://jsonlines.org) -- one query one line,
You can pipe them to [**jq**](https://stedolan.github.io/jq/) to format them:

- Note that, we use `curl -s` to disable curl's progress bar.

```bash
curl -s https://api.whereabouts.cicada-lang.org/run -d @- <<END | jq

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

END
```

### Command line tool

Install it by the following command:

```
npm install -g @cicada-lang/cicada-whereabouts
```

The command line program is called `whereabouts`.

## Examples

```
whereabouts docs/tests/clause-and-effect/worksheet-02-drinking-pairs.cw
```

Outputs:

```js
{ "success": true, "count": 3, "solutions": [{ "left": "mary" }, { "left": "john" }, { "left": "fred" }] }
{ "success": true, "count": 9, "solutions": [{ "left": "mary", "right": "mary" }, { "left": "mary", "right": "john" }, { "left": "mary", "right": "fred" }, { "left": "john", "right": "mary" }, { "left": "john", "right": "john" }, { "left": "john", "right": "fred" }, { "left": "fred", "right": "mary" }, { "left": "fred", "right": "john" }, { "left": "fred", "right": "fred" }] }
{ "success": true, "count": 14, "solutions": [{ "left": "john", "right": "john", "alcohol": "martini" }, { "left": "mary", "right": "mary", "alcohol": "gin" }, { "left": "mary", "right": "john", "alcohol": "gin" }, { "left": "mary", "right": "fred", "alcohol": "gin" }, { "left": "susan", "right": "susan", "alcohol": "vodka" }, { "left": "susan", "right": "fred", "alcohol": "vodka" }, { "left": "john", "right": "mary", "alcohol": "gin" }, { "left": "john", "right": "john", "alcohol": "gin" }, { "left": "john", "right": "fred", "alcohol": "gin" }, { "left": "fred", "right": "mary", "alcohol": "gin" }, { "left": "fred", "right": "john", "alcohol": "gin" }, { "left": "fred", "right": "fred", "alcohol": "gin" }, { "left": "fred", "right": "susan", "alcohol": "vodka" }, { "left": "fred", "right": "fred", "alcohol": "vodka" }] }
```

The outputs are [JSON lines](https://jsonlines.org) -- one query one line,
You can also make use of [**jq**](https://stedolan.github.io/jq/) to format them:

```
whereabouts docs/tests/clause-and-effect/worksheet-02-drinking-pairs.cw | jq
```

The content of [worksheet-02-drinking-pairs.cw](docs/tests/clause-and-effect/worksheet-02-drinking-pairs.cw) is:

[ [PLAYGROUND](https://whereabouts.cicada-lang.org/playground/RHJpbmsgeyBwZXJzb246ICJqb2huIiwgYWxjb2hvbDogIm1hcnRpbmkiIH0KRHJpbmsgeyBwZXJzb246ICJtYXJ5IiwgYWxjb2hvbDogImdpbiIgfQpEcmluayB7IHBlcnNvbjogInN1c2FuIiwgYWxjb2hvbDogInZvZGthIiB9CkRyaW5rIHsgcGVyc29uOiAiam9obiIsIGFsY29ob2w6ICJnaW4iIH0KRHJpbmsgeyBwZXJzb246ICJmcmVkIiwgYWxjb2hvbDogImdpbiIgfQpEcmluayB7IHBlcnNvbjogImZyZWQiLCBhbGNvaG9sOiAidm9ka2EiIH0KCkZyaWVuZHMgeyBsZWZ0LCByaWdodCwgYWxjb2hvbCB9Ci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB7CiAgRHJpbmsgeyBwZXJzb246IGxlZnQsIGFsY29ob2wgfQogIERyaW5rIHsgcGVyc29uOiByaWdodCwgYWxjb2hvbCB9Cn0KCnF1ZXJ5IChsZWZ0KSB7CiAgRnJpZW5kcyB7IGxlZnQsIHJpZ2h0OiAibWFyeSIsIGFsY29ob2w6ICJnaW4iIH0KfQoKcXVlcnkgKGxlZnQsIHJpZ2h0KSB7CiAgRnJpZW5kcyB7IGxlZnQsIHJpZ2h0LCBhbGNvaG9sOiAiZ2luIiB9Cn0KCnF1ZXJ5IChsZWZ0LCByaWdodCwgYWxjb2hvbCkgewogIEZyaWVuZHMgeyBsZWZ0LCByaWdodCwgYWxjb2hvbCB9Cn0) ]

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

query (left, right) {
  Friends { left, right, alcohol: "gin" }
}

query (left, right, alcohol) {
  Friends { left, right, alcohol }
}
```

The above example use JSON object, we can also use JSON array.

Like in [worksheet-03-affordable-journeys.cw](docs/tests/clause-and-effect/worksheet-03-affordable-journeys.cw):

[ [PLAYGROUND](https://whereabouts.cicada-lang.org/playground/Qm9yZGVyIFsic3Vzc2V4IiwgImtlbnQiXQpCb3JkZXIgWyJzdXNzZXgiLCAic3VycmV5Il0KQm9yZGVyIFsic3VycmV5IiwgImtlbnQiXQpCb3JkZXIgWyJoYW1wc2hpcmUiLCAic3Vzc2V4Il0KQm9yZGVyIFsiaGFtcHNoaXJlIiwgInN1cnJleSJdCkJvcmRlciBbImhhbXBzaGlyZSIsICJiZXJrc2hpcmUiXQpCb3JkZXIgWyJiZXJrc2hpcmUiLCAic3VycmV5Il0KQm9yZGVyIFsid2lsdHNoaXJlIiwgImhhbXBzaGlyZSJdCkJvcmRlciBbIndpbHRzaGlyZSIsICJiZXJrc2hpcmUiXQoKQWRqYWNlbnQgW3gsIHldCi0tLS0tLS0tLS0tLS0tLS0gYm9yZGVyIHsKICBCb3JkZXIgW3gsIHldCn0KCkFkamFjZW50IFt4LCB5XQotLS0tLS0tLS0tLS0tLS0tIHN5bW1ldHJ5IHsKICBCb3JkZXIgW3ksIHhdCn0KCkFmZm9yZGFibGUgW3gsIHldCi0tLS0tLS0tLS0tLS0tLS0tLS0tIHsKICBBZGphY2VudCBbeCwgel0KICBBZGphY2VudCBbeiwgeV0KfQoKcXVlcnkgKHRvX2tlbnQpIHsKICBBZmZvcmRhYmxlIFt0b19rZW50LCAia2VudCJdCn0KCnF1ZXJ5ICh0b19zdXNzZXgpIHsKICBBZmZvcmRhYmxlIFsic3Vzc2V4IiwgdG9fc3Vzc2V4XQp9CgpxdWVyeSAoeCwgeSkgewogIEFmZm9yZGFibGUgW3gsIHldCn0) ]

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

query (to_sussex) {
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
