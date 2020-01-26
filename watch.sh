#!/usr/bin/env bash

set -x

inotifywait -m -q -e close_write src views tongs.json ../tongs/*; while read file; do
    vendor/bin/tongs
done
