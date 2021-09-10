#!/bin/bash

# Make sure we are in our repository directory
cd /home/javali/Documents/JavaliMZ.github.io
# Check status of the git repo, add new files and commit
mdbook build

git status
git add -A

echo -n "Enter message to commit 'main' branch: "
read message
git commit -m "$message"
git branch -m main
# Add the GitHub repository as a remote and push your changes
# NOTE: you might have to setup you GitHub access token
git remote add github https://github.com/JavaliMZ/JavaliMZ.github.io
git push github main
# deploy the static site to GitHub Pages
git checkout --orphan gh-pages
git rm -rf .
rm '.gitignore'

git commit --allow-empty -m "new clean branch"
git checkout main
git worktree add /tmp/book gh-pages
git worktree list
mdbook build
rm -rf /tmp/book/*
cp -rp book/* /tmp/book/
pushd /tmp/book
git add -A
git commit -m 'new blog deployed'
git push github gh-pages
popd
git worktree remove /tmp/book