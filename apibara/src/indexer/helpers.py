from typing import  Optional
from pymongo import ASCENDING, DESCENDING
from pymongo.cursor import CursorType

import strawberry


def add_order_by_constraint(cursor: CursorType, orderBy: Optional[str] = None, orderByDirection: Optional[str] = "asc") -> CursorType:
    if orderBy:
        if orderByDirection == "asc":
            cursor = cursor.sort(orderBy, ASCENDING)
        else:
            cursor = cursor.sort(orderBy, DESCENDING)
    return cursor
