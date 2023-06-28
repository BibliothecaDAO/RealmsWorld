import asyncio
from datetime import datetime
from typing import List, NewType, Optional
from decimal import Decimal

import strawberry
from aiohttp import web
from pymongo import MongoClient
from strawberry.aiohttp.views import GraphQLView
from strawberry.types import Info
from indexer.helpers import (add_order_by_constraint)

def parse_hex(value):
    if not value.startswith("0x"):
        raise ValueError("invalid Hex value")
    return bytes.fromhex(value.replace("0x", ""))


def serialize_hex(token_id):
    return "0x" + token_id.hex()

def parse_felt(value):
    return value.to_bytes(32, "big")


def serialize_felt(value):
    return int.from_bytes(value, "big")

def parse_u256(value):
    return value

def serialize_u256(value):
    return int(float(value))

HexValue = strawberry.scalar(
    NewType("HexValue", bytes),
    parse_value=parse_hex,
    serialize=serialize_hex
)

FeltValue = strawberry.scalar(
    NewType("FeltValue", bytes), parse_value=parse_felt, serialize=serialize_felt
)
U256Value = strawberry.scalar(
    NewType("U256Value", bytes), parse_value=parse_u256, serialize=serialize_u256
)

@strawberry.type
class Deposit:
    id: str
    l2Recipient: str
    amount: Decimal
    timestamp: datetime
    hash: str

    @classmethod
    def from_mongo(cls, data):
        return cls(
            id=data["hash"],
            hash=data["hash"],
            l2Recipient=data["l2Recipient"],
            amount=data["amount"].to_decimal(),
            timestamp=data["timestamp"],
        )
    
@strawberry.type
class Withdrawal:
    l1Recipient: str
    l2Sender: str
    amount: U256Value
    timestamp: datetime

    @classmethod
    def from_mongo(cls, data):
        return cls(
            l2Sender=data["l2Sender"],
            l1Recipient=data["l1Recipient"],
            amount=data["amount"],
            timestamp=data["timestamp"],
        )

@strawberry.input
class WhereFilterForTransaction:
    id: Optional[str] = None

def get_deposits(
            info: Info, first: Optional[int] = 100, skip: Optional[int] = 0, orderBy: Optional[str] = None, orderByDirection: Optional[str] = "asc", where: Optional[WhereFilterForTransaction] = None
) -> List[Deposit]:
    
    db = info.context["db"]
    filter = dict()

    if where is not None:
        if where.id is not None:
            filter["hash"] = where.id

    query = db["deposits"].find(filter).skip(skip).limit(first)
    print(f"{vars(query)}")
    #query = add_order_by_constraint(query, orderBy, orderByDirection)
    return [Deposit.from_mongo(d) for d in query]

def get_deposit(info: Info, hash: str) -> Deposit:
    db = info.context["db"]

    query = {"hash": hash}

    deposit = db["deposits"].find_one(query)
    return Deposit.from_mongo(deposit)

def get_withdrawals(
            info: Info, first: Optional[int] = 100, skip: Optional[int] = 0, orderBy: Optional[str] = None, orderByDirection: Optional[str] = "asc", where: Optional[WhereFilterForTransaction] = None
) -> List[Withdrawal]:
    
    db = info.context["db"]
    filter = dict()

    if where is not None:
        if where.id is not None:
            filter["hash"] = where.id

    query = db["withdrawals"].find(filter).skip(skip).limit(first)
    #print(f"{vars(query)}")
    #query = add_order_by_constraint(query, orderBy, orderByDirection)
    return [Withdrawal.from_mongo(d) for d in query]

@strawberry.type
class Query:
    deposits: List[Deposit] = strawberry.field(resolver=get_deposits)
    deposit: Optional[Deposit] = strawberry.field(resolver=get_deposit)
    withdrawals: List[Withdrawal] = strawberry.field(resolver=get_withdrawals)

class IndexerGraphQLView(GraphQLView):
    def __init__(self, db, **kwargs):
        super().__init__(**kwargs)
        self._db = db

    async def get_context(self, _request, _response):
        return {"db": self._db}

async def run_graphql_api(mongo_goerli=None, mongo_mainnet=None, port="8080"):
    mongo_goerli = MongoClient(mongo_goerli)
    mongo_mainnet = MongoClient(mongo_mainnet)
    db_name_goerli = "lords-bridge-indexer-goerli".replace("-", "_")
    db_name_mainnet = "lords-bridge-indexer-mainnet".replace("-", "_")

    db_goerli = mongo_goerli[db_name_goerli]
    db_mainnet = mongo_mainnet[db_name_mainnet]

    schema = strawberry.Schema(query=Query)
    view_goerli = IndexerGraphQLView(db_goerli, schema=schema)
    view_mainnet = IndexerGraphQLView(db_mainnet, schema=schema)

    app = web.Application()
    app.router.add_route("*", "/goerli-graphql", view_goerli)
    app.router.add_route("*", "/graphql", view_mainnet)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "localhost", int(port))
    await site.start()

    print(f"GraphQL server started on port {port}")

    while True:
        await asyncio.sleep(5_000)