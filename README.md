# Whereabouts

> I asked the boy beneath the pines. <br/>
> He said, "The master's gone alone <br/>
> Herb-picking, somewhere on the mount, <br/>
> Cloud-hidden, **whereabouts unknown**." <br/>
> -- [Jia Dao](https://en.wikipedia.org/wiki/Jia_Dao)

## Usages

### Online playground

[**whereabouts-website:**](https://github.com/cicada-lang/whereabouts-website)
A playground where people can share code snippet.

Example playground code snippets:

- [A little SAT solver](https://whereabouts.cicada-lang.org/playground/Ly8gV2UgdXNlIGAwYCBhbmQgYDFgCi8vIGZvciBgZmFsc2VgIGFuZCBgdHJ1ZWAsCi8vIGJlY2F1c2UgdGhlIGNvZGUgbG9va3MgdGlkaWVyLgoKQml0KHgpIC0tIHsgeCA9IDAgfQpCaXQoeCkgLS0geyB4ID0gMSB9CgpOb3QoMCwgMSkKTm90KDEsIDApCgpPcigwLCAwLCAwKQpPcigwLCAxLCAxKQpPcigxLCAwLCAxKQpPcigxLCAxLCAxKQoKQml0TGlzdChbXSkKQml0TGlzdChbY2FyIHwgY2RyXSkgLS0gewogIEJpdChjYXIpCiAgQml0TGlzdChjZHIpCn0KCkxpc3ROb3QoW10sIFtdKQpMaXN0Tm90KFt4IHwgeHNdLCBbeSB8IHlzXSkgLS0gewogIE5vdCh4LCB5KQogIExpc3ROb3QoeHMsIHlzKQp9CgovLyBBIGNsYXVzZSByZXByZXNlbnQKLy8gICBjMSDiiKggYzIg4oioIC4uLiA8LSBwMSDiiKcgcDIg4oinIC4uLgovLyB3aGljaCBpcyBlcXVpdmFsZW50IHRvIGRpc2p1bmN0aW9uIGZyb20KLy8gICBjMSDiiKggYzIg4oioIC4uLiDCrHAxIOKIqCDCrHAyIOKIqCAuLi4KCkNsYXVzZShjb25jbHVzaW9ucywgcHJlbWlzZXMpIC0tIHsKICBCaXRMaXN0KGNvbmNsdXNpb25zKQogIEJpdExpc3QocHJlbWlzZXMpCiAgTGlzdE5vdChwcmVtaXNlcywgbmVnUHJlbWlzZXMpCiAgQXBwZW5kKGNvbmNsdXNpb25zLCBuZWdQcmVtaXNlcywgZGlzanVuY3Rpb24pCiAgLy8gVG8gc2F0aXNmeSBhIGRpc2p1bmN0aW9uLAogIC8vIGl0cyBlbGVtZW50IG11c3QgY29udGFpbnMgYSB0cnVlLAogIC8vIHNwZWNpYWxseSBlbXB0eSBsaXN0IGNhbiBub3QgYmUgc2F0aXNmaWVkLgogIENvbnRhaW5zT25lKGRpc2p1bmN0aW9uKQp9CgpDb250YWluc09uZShbMSB8IF9yZXN0XSkKQ29udGFpbnNPbmUoWzAgfCByZXN0XSkgLS0gewogIENvbnRhaW5zT25lKHJlc3QpCn0KCkFwcGVuZChbXSwgdCwgdCkKQXBwZW5kKFthIHwgZF0sIHQsIFthIHwgcmVzXSkgLS0gewogIEFwcGVuZChkLCB0LCByZXMpCn0KCmZpbmQgW3gxLCB4MiwgeDNdIHsKICBDbGF1c2UoW3gxXSwgW3gyXSkKICBDbGF1c2UoW3gyLCB4M10sIFt4MV0pCiAgQ2xhdXNlKFtdLCBbeDFdKQp9CgpmaW5kIFt4MV0gewogIENsYXVzZShbeDFdLCBbXSkKICBDbGF1c2UoW10sIFt4MV0pCn0K)
- [Conjunctive normal form](https://whereabouts.cicada-lang.org/playground/cnVsZSBjb25qdW5jdGl2ZU5vcm1hbEZvcm0gewogIG5vdChub3QoYSkpID0-IGEKICBub3QoYW5kKGEsIGIpKSA9PiBvcihub3QoYSksIG5vdChiKSkKICBub3Qob3IoYSwgYikpID0-IGFuZChub3QoYSksIG5vdChiKSkKICBvcihhbmQoYSwgYiksIGMpID0-IGFuZChvcihhLCBjKSwgb3IoYiwgYykpCiAgb3IoYSwgYW5kKGIsIGMpKSA9PiBhbmQob3IoYSwgYiksIG9yKGEsIGMpKQp9CgpldmFsIGNvbmp1bmN0aXZlTm9ybWFsRm9ybSgKICBxdW90ZSBub3QoYW5kKG5vdChBKSwgbm90KEIpKSkKKQo)

### Use our server

[**whereabouts-server:**](https://github.com/cicada-lang/whereabouts-server)
A server that can run whereabouts code.

Post a file:

```sh
curl https://wa.cic.run --data-binary @<file>
```

You can fetch code from a URL, and run:

- We use `curl -s` to disable curl's progress bar.
- All files in this repo, can be fetched from: [`https://cdn.wa.cic.run/<path>`](https://cdn.wa.cic.run)

```sh
curl -s https://cdn.wa.cic.run/docs/books/clause-and-effect/01-party-pairs.wa |
curl -s https://wa.cic.run --data-binary @-
```

Run multiline text (bash and zsh):

```sh
curl https://wa.cic.run --data-binary @-<< END

Whereabouts("unknown")

find q {
  Whereabouts(q)
}

END
```

### Command line tool

Install it by the following command:

```sh
sudo npm install -g @cicada-lang/whereabouts
```

The command line program is called `wa`.

```sh
wa repl                # Open an interactive REPL
wa run <file>          # Run a file
wa run <file> --watch  # Run and watch file change
```

Type `wa help` to see what other commands are available.

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

Thank you, [**Daniel P. Friedman**](https://www.cs.indiana.edu/~dfried), [**William E. Byrd**](http://webyrd.net), [**Oleg Kiselyov**](https://okmij.org/ftp/) and [**Jason Hemann**](https://jasonhemann.github.io/),
for your book [**"The Reasoned Schemer"**](https://mitpress.mit.edu/9780262535519/the-reasoned-schemer/).

Thank you, [**Bharathi Ramana Joshi**](https://bharathi.xyz/) and [**William E. Byrd**](http://webyrd.net),
for writing [**a great tutorial**](docs/papers/an-annotated-implementation-of-minikanren-with-constraints.pdf) about implementing constraint logic programming.

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
