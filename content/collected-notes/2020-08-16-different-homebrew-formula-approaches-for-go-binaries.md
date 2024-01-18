{
  "title": "Different Homebrew formula approaches (for `go` binaries)",
  "date": "2020-08-16T16:41:18.104Z",
  "lastmod": "2020-08-16T16:41:18.104Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/different-homebrew-formula-approaches-for-go-binaries",
  "visibility": "public"
}

`homebrew-core` requires binaries to be compiled from source, you can't just download an asset from GitHub Releases and then use the `bin.install` command to setup the binary.

If you'd prefer to use the pre-compiled you can't introduce your tool into `homebrew-core`, ie. it won't be installable with `brew install toolname`. Instead you can create a tap (such as [croc](https://github.com/schollz/homebrew-tap/blob/master/Formula/croc.rb) which allows `brew install schollz/tap/croc` and maps to `schollz/homebrew-tap/Formula/croc.rb` on GitHub) or you can create a Formula file for direct reference (such as the [pup.rb](https://github.com/ericchiang/pup/blob/master/pup.rb) file in the `ericchiang/pup` GitHub repo). GoReleaser has [support for maintaining Homebrew taps](https://goreleaser.com/customization/homebrew/).

If you do want to include it in `homebrew-core` you can follow the example of [homebrew-core/Formula/pup.rb](https://github.com/Homebrew/homebrew-core/blob/6a8f5692ae05d70f347ce194d9cd892370712239/Formula/pup.rb) which uses homebrew dependencies on `go` and `gox` to build. Your go project must be vendored though, ie. you can't use `go get` in the build step, for the `homebrew-core` maintainers to accept it.
