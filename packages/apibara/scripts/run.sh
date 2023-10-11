#!/bin/bash

while true; do
  run --allow-env=/data/env /data/src/beasts_transfers.ts -A dna_FCqLW4vWwpveLSLpp16V --status-server-address 0.0.0.0:1001 --persist-to-fs=.apibara --sink-id=adventurers
  echo "Apibara exited with status $? - Restarting..." >&2
  sleep 1
done