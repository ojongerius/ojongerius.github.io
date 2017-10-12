Repository used to generate www.0tt0.net

# Deploying
Changes *must* be pushed to the deploy branch (which is set to be the default for this repository).
Successful Travis builds will generate a static site using HUgo in subdirectory `public` and commit those
to the `master` branch for Github Pages to serve up.

A more natural flow would be to have master deploy to the
gh-pages branch, which is not available for user pages -see [configuring a publishing source for Github Ppages.](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages)

# Content creation
Create new posts:

```shell
cd sabbatical-hugo
hugo new posts/my-first-post.md
```
