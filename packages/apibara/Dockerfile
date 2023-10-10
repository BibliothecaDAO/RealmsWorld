FROM quay.io/apibara/sink-postgres:0.4

COPY src ./data/src
COPY env ./data

CMD apibara-sink-postgres run --allow-env=/data/env /data/src/beasts_transfers.ts -A dna_FCqLW4vWwpveLSLpp16V