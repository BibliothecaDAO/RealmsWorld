from lru import LRU


class CachedContractStorage:
    """Store and retrieve information about contracts."""

    def __init__(self, db):
        self._cache = LRU(100)
        self._db = db
        self._contracts = self._db["contracts"]

    def get(self, address):
        existing = self._cache.get(address)
        if existing is not None:
            return existing
        # get from mongo
        contract = self._contracts.find_one({"contract_address": address})
        if contract is None:
            return None
        # update cache
        self._cache[address] = contract
        return contract

    def set(self, address, contract):
        data = {**contract, "contract_address": address}
        self._contracts.insert_one(data)
