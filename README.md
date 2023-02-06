# Mo

## Usages

### Command line tool

Install it by the following command:

```sh
sudo npm install -g @cicada-lang/mo
```

The command line program is called `mo`.

```sh
mo repl                # Open an interactive REPL
mo run <file>          # Run a file
mo run <file> --watch  # Run and watch file change
```

Type `mo help` to see what other commands are available.

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
npm run test          # Run test
npm run test:watch    # Watch the testing
```

## Thanks

Thank you, [Daniel P. Friedman](https://www.cs.indiana.edu/~dfried), [William E. Byrd](http://webyrd.net), [Oleg Kiselyov](https://okmij.org/ftp/) and [Jason Hemann](https://jasonhemann.github.io/),
for your book ["The Reasoned Schemer"](https://mitpress.mit.edu/9780262535519/the-reasoned-schemer/).

Thank you, [Bharathi Ramana Joshi](https://bharathi.xyz/) and [William E. Byrd](http://webyrd.net),
for writing [a great tutorial](docs/papers/an-annotated-implementation-of-minikanren-with-constraints.pdf) about implementing constraint logic programming.

## Community

GitHub:

- Organization: [github.com/cicada-lang](https://github.com/cicada-lang)

Telegram:

- English chat group: [CicadaLanguage](https://t.me/CicadaLanguage)
- Chinese chat group: [CicadaLanguageCN](https://t.me/CicadaLanguageCN)

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
