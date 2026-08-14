The package structure is fairly typical for `FastAPI` applications. Specifically:
* `app.models` - contains the database models used -- these should always match the DB schema and enforce relationships using `sqlalchemy`.
* `app.schemas` - contains the Pydantic models used for request/response objects. They should have mappings from the `app.models` where applicable.
* `app.routers` - contains the controllers for the different api functions.
* `app.services` - contains the service layer that maps to the controllers and does the actual DB interactions.
* `app.core` - high level configurations and setup for when the application starts.
* `app.dependencies` - TODO
* `app.utils` - any utility methods needed (e.g. auth functions).
* `main.py` - the main application that pulls everything together using FastAPI.

Running
-------

Recommended commands (run from the `packinglist-api` folder):

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
# or
python -m app.main
```

VS Code Run/Debug
-----------------

If you want to use the VS Code Run button or debugger, add the provided `.vscode/launch.json` configuration so Uvicorn is launched as a module (or set `PYTHONPATH` to the `packinglist-api` folder). This ensures `import app` resolves correctly when running from the editor.
