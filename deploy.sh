#!/usr/bin/env bash
rsync -avh ./ pi@192.168.0.148:code/paraseq/ \
--exclude modules/client/node_modules \
--exclude modules/screen/node_modules \
--exclude modules/sequencer/node_modules \
--exclude modules/server/node_modules \
--exclude modules/shared/node_modules
