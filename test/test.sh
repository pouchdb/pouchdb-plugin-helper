#!/bin/bash

set -e

./bin/pouchdb-plugin-helper lint
./bin/pouchdb-plugin-helper badges
./bin/pouchdb-plugin-helper travis
./bin/pouchdb-plugin-helper gitignore
