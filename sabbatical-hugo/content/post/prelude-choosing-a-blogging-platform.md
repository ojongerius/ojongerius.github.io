+++
date = "2017-05-13T14:59:10+12:00"
draft = true
title = "Choosing a blogging platform"
tags = ["sabbatical", "blog"]

+++

So you want to write a blog, but what's the lay of the land today in the blog
landscape?

I've blogged on a privately hosted Wordpress platform many years ago. I admire
Matt Mullenweg, and he is part of the reason why I chose to blog on a platform
where *I* own the content, versus platforms like Medium, Google+ or Facebook.

However, using a CMS feels clunky nowadays, I'd much rather use Markdown
locally, in my favorite editor. Using Git to store and revise data is
just makes sense as a developer. And why suffer the stress of looming
PHP vulnerabilities exposing you to danger when all you really need is a static
site?

## Static site generators
### Jekyll and co
Enter static site generators. Jekyall, created by Github co-founder Tom Preson-Werner
in 2008, 5 years after Wordpress was released, paved the way and seems to still be
the de facto standard. 

Entertainingly although Preston-Werner (1) created Jekyll to be able to create
content like a hacker, or software developper. But nowadays more people that are 
not comfortable using the command line want to use static site generators for
their speed and decreased attack surface. There is a whole ecosystem out there
that allows people to use static site generators, without being familiar with
Git. There is a merit to allow hackers to use their own tools, and give less
technical people a nice frontend.

### Hugo
In 2013 Steve Francia while working at MongoDB, later Docker, and now Google,
created Hugo, a static site generator written with the same motivation as
Preston-Werner, but was frustrated with the complicated set up of Jekyll -and
2 other famous static site generators Middleman and Nanoc. Those old generators
are all Ruby based, making them tedious to set up, you'll know what I mean 
if you've worked with Gems in anger, or suffered from incompatibilities between
minor Ruby versions. Long story short, Hugo is written in Go, making it very
portable, self contained, and *fast*

## Which is the right one for me?
If do not need anything that requiring Jekyll plugins, using Jekyll on Github
Pages is probably what you want, GH pages will generate your production site
for you, and it's just so easy to set up and get going.

If you want testing, using for instance Travis, you'll need to set up builds
anyway, if you don't shy away from going this far, I'd recommend using Hugo.

If you are in a situation where you desire something like AMP, you currently
need to use a plugin for Jekyll. Like with a want for testing, you will
have to generate your site yourself -Github, for security reasons does not
generates sites with plugins, for security reasons. I'd make the same call
here, use Hugo.

If you want something future proof, I'd chose Hugo too, it has the advantage
of having learned from it's predecessors, and has done so very nicely.

Need something that is not just focussed on blogging, or have the need for speed?
Hugo.

What did I end up using? Well both to be able to write this little article,
but after initially going for Jekyll, and now wanting a little robustness
by testing, and possibly AMP for speed and SEO, I'm going to go with Hugo.

## Deploying

* Jekyll: native support _unless_ you need plugin support.
* Hugo: No native support, however, Travis is able to deploy to Github Pages using the pages
 target, see https://docs.travis-ci.com/user/deployment/pages. This rocks,
 because you can now run some tests, and do any customisations you want, and your
  only dependency will be to install Hugo. Benefits here are that installation is just a
  one-line in your Travis config. But you'll be able to use the one liner on your laptop,
   no matter which Operating System you run, without having to worry about dependencies. Awesome.

If you find yourself in a position where you wanting to commit changes to a separate branch -the most often way
to deploy, you can save yourself unnecessary commits and fiddling around by using  https://github.com/X1011/git-directory-deploy automates deploying to a separate
branch and only commits to the branch if changes would have created changes to your target website.

However, if you are using Travis and Github pages you can let the `pages` deployment do the heavy lifting
 for you. An example Travis config would look like so:

```
 language: go

 go: 1.8

 install: go get -v gopkg.in/spf13/hugo.v0 # Install the latest v0 release -currently 0.20.7

 script:
     - cd sabbatical-hugo                # Our sources live here
     - $GOPATH/bin/hugo.v0               # Hugo will default to writing output to public
     - echo www.0tt0.net >> public/CNAME # Use a custom domain

 deploy:
   provider: pages             # Use the Github Pages provider
   skip_cleanup: true          # Don't remove the output files of our builds, the provider needs them to deploy
   local_dir: public           # Hugo output will be found to here
   github_token: $GITHUB_TOKEN # As set in travis-ci.org dashboard
   target_branch: master       # Sites following the user.github.io pattern can only be served from master :|
   on:
     branch: deploy

```


Need HTTPS and want easy CI integration? Check out https://www.netlify.com/ <- TODO: get referral?

TODO: add testing? Add promise for BBCI example?
TODO: add syntax highlighing (install pygments)

Good post: https://www.metachris.com/2017/04/continuous-deployment-hugo---travis-ci--github-pages/

TODO: turn these in nice links, and link to them in the doco up
<p id=1> http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html </p>
[2] https://twitter.com/spf13
[3 - Jekyll](http://jekyllrb.com)
[4 - Hugo](http://gohugo.io)

[] Middleman https://middlemanapp.com
[] Nanoc http://nanoc.ws
[] Go https://golang.org
[] https://www.ampproject.org
[] https://github.com/eliasson/liquorice // Simple theme.
[] https://github.com/dim0627/hugo_theme_robust AMP, from Hugo site example
[] https://themes.gohugo.io/slim/ nice and minimal
[] https://themes.gohugo.io/hyde by SPF but original by @mdo (github)
[] https://themes.gohugo.io/hucore a minimal version based on Hemmingway2.
[] https://docs.travis-ci.com/user/deployment/pages/