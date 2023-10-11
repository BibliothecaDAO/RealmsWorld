FROM quay.io/apibara/sink-postgres:0.4

COPY src ./data/src
COPY env-goerli ./data
ENV AUTH_TOKEN=dna_FCqLW4vWwpveLSLpp16V

CMD ["run", "--allow-env=/data/env-goerli", "/data/src/beasts_transfers.ts"]