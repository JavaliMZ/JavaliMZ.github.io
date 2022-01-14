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