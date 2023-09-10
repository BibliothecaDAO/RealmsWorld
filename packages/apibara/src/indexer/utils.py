from decimal import Decimal
from apibara.starknet.proto.types_pb2 import FieldElement
from apibara.starknet import felt
def encode_int_as_bytes(n):
    return n.to_bytes(32, "big")

def check_exists_int(val):
    if val == 0:
        return None
    else:
        return encode_int_as_bytes(val)
    

def to_decimal(n: int, decimals: int) -> Decimal:
    num = Decimal(10) ** Decimal(decimals)
    return Decimal(n) / num

def from_uint256(low: FieldElement, high: FieldElement) -> int:
    return felt.to_int(low) + (felt.to_int(high) << 128)
