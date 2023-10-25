FROM quay.io/apibara/sink-postgres:0.4

COPY src ./data/src
COPY goerli.env ./data
ENV AUTH_TOKEN=dna_FCqLW4vWwpveLSLpp16V

CMD ["run", "--allow-env=/data/goerli.env", "/data/src/erc721_transfers.ts", "--persist-to-etcd=decent-respect.railway.internal:2379", "--sink-id=erc721_transfers"]