from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.routers import users, lists, categories, items

app = FastAPI()
app.include_router(users.router)
app.include_router(lists.router)
app.include_router(categories.router)
app.include_router(items.router)

app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
async def root():
    print("in root()")
    return "Hello, World!"
