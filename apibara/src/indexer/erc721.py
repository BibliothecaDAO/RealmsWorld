from dataclasses import dataclass
from typing import Iterator, List, Tuple
from apibara.starknet import EventFilter, Filter, StarkNetIndexer, felt
from indexer.utils import from_uint256


@dataclass
class TokenId:
    id: int

    def to_bytes(self) -> bytes:
        return int_to_bytes(self.id)


class Uint256TokenId(TokenId):
    pass


class FeltTokenId(TokenId):
    pass


@dataclass
class TransferEvent:
    from_address: int
    to_address: int
    token_id: TokenId


class ERC721Contract:
    def __init__(self, rpc, address) -> None:
        self._rpc = rpc
        self._address = address

    async def is_erc721(self, token_id):
        # Check 1. Supports interface?
        try:
            response = await self._rpc.call(
                self._address, "supportsInterface", ["0x80ac58cd"]
            )
            return response == ["0x1"]
        except:
            pass

        # Check 2. Does tokenURI return anything?
        try:
            if isinstance(token_id, FeltTokenId):
                args = [hex(token_id.id)]
            elif isinstance(token_id, Uint256TokenId):
                low, high = _int_to_uint256(token_id.id)
                args = [hex(low), hex(high)]
            else:
                return False

            _ = await self._rpc.call(self._address, "tokenURI", args)
            return True
        except:
            pass
        return False

    async def name(self):
        try:
            name_response = await self._rpc.call(self._address, "name", [])
            return _decode_string_from_response(name_response)
        except:
            return None


def decode_transfer_event(data: List[bytes]) -> TransferEvent:
    if len(data) == 3:
        data_iter = iter(data)
        from_ = _felt_from_iter(data_iter)
        to = _felt_from_iter(data_iter)
        token_id = _felt_from_iter(data_iter)
        token_id = FeltTokenId(token_id)
        return TransferEvent(from_, to, token_id)
    elif len(data) == 4:
        data_iter = iter(data)
        from_ = felt.to_hex(data[0])
        to = felt.to_hex(data[1])
        token_id = from_uint256(data[2], data[3])
        return TransferEvent(from_, to, token_id)
    else:
        return None


def hex_to_bytes(s: str) -> bytes:
    s = s.replace("0x", "")
    # Python doesn't like odd-numbered hex strings
    if len(s) % 2 == 1:
        s = "0" + s
    return bytes.fromhex(s)


def int_to_bytes(n: int) -> bytes:
    return n.to_bytes(32, "big")


def bytes_to_int(b: bytes) -> int:
    return int.from_bytes(b, "big")


def _uint256_from_iter(it: Iterator[bytes]):
    low = _felt_from_iter(it)
    high = _felt_from_iter(it)
    return (high << 128) + low


def _int_to_uint256(n: int) -> Tuple[int, int]:
    high = n >> 128
    low = n - (high << 128)
    return low, high


def _felt_from_iter(it: Iterator[bytes]):
    return bytes_to_int(next(it))


def _decode_string_from_response(data: List[str]):
    if len(data) == 1:
        return _decode_short_string(iter(data))
    return _decode_long_string(iter(data))


def _decode_short_string(it: Iterator[str]):
    return hex_to_bytes(next(it)).decode("ascii")


def _decode_long_string(it: Iterator[str]):
    string_len = bytes_to_int(hex_to_bytes(next(it)))
    acc = ""
    for _ in range(string_len):
        acc += _decode_short_string(it)
    return acc
