#!/usr/bin/env bash
yarn build &&
bundle exec cap production deploy
