from pydantic import BaseModel, Field

LEN_NAME = 200
LEN_PHONE_MIN = 10
LEN_PHONE_MAX = 15
LEN_ADDRESS = 500
LEN_DETAILS = 1000
LEN_SLUG = 100
LEN_AREA = 100


class CreateRequestIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=LEN_NAME)
    phone: str = Field(..., min_length=LEN_PHONE_MIN, max_length=LEN_PHONE_MAX)
    address: str = Field(..., min_length=1, max_length=LEN_ADDRESS)
    details: str | None = Field(None, max_length=LEN_DETAILS)
    service_slug: str = Field(..., min_length=1, max_length=LEN_SLUG)


class CreateProviderIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=LEN_NAME)
    phone: str = Field(..., min_length=LEN_PHONE_MIN, max_length=LEN_PHONE_MAX)
    category_slug: str = Field(..., min_length=1, max_length=LEN_SLUG)
    area: str = Field(..., min_length=1, max_length=LEN_AREA)
