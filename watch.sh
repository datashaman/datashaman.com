#!/usr/bin/env bash

set -x

while inotifywait -r -e close_write src views tongs.json ../tongs/*; do
    vendor/bin/tongs
done
