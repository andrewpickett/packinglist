# PackingList

A simple full-stack packing list application with a FastAPI backend and a React + Vite frontend.

## Overview

PackingList helps users create and manage packing lists, categories, and items. The repository contains two separate apps:

- packinglist-api: FastAPI backend providing REST endpoints and authentication.
- packinglist-web: React + Vite frontend (TypeScript) that consumes the backend API.

## Architecture

- Backend: FastAPI, SQLAlchemy / databases, Pydantic models, MySQL connector, JWT-based auth utilities.
- Frontend: React (TypeScript) using Vite, Bootstrap for styling, axios for API requests.

The backend serves JSON APIs (and OpenAPI docs) while the frontend runs separately in development and communicates with the API at http://127.0.0.1:8000 by default.

## Tech Stack

- Python 3.10+
- FastAPI, Uvicorn
- SQLAlchemy, databases
- MySQL (mysql-connector-python)
- Pydantic
- React 19 + TypeScript, Vite
- Bootstrap
- Axios

(Exact backend dependencies are listed in `packinglist-api/requirements.txt` and frontend dependencies in `packinglist-web/package.json`.)

## Prerequisites

- Python 3.10+ installed
- Node.js (18+) and npm or yarn
- MySQL (or another SQL DB if you adapt `DATABASE_URL`)

## Local setup

### Backend (packinglist-api)

1. Create a virtual environment and install dependencies:

```powershell
cd packinglist-api
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt
```

2. Configure environment variables.

The app expects a database connection and may use JWT secrets. Example environment variables (set appropriately):

```powershell
set DATABASE_URL=mysql+mysqlconnector://<user>:<password>@localhost:3306/packinglist
set JWT_SECRET=your-secret
```

Note: `app/core/config.py` is present in the project (currently minimal). Adjust configuration or add a `.env` loader as needed.

3. Run the dev server:

```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

4. API docs available at:

- OpenAPI UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

### Frontend (packinglist-web)

1. Install dependencies and start dev server:

```bash
cd packinglist-web
npm install
npm run dev
```

2. The frontend dev server runs on port 3000 by default. It is configured to allow CORS from `http://localhost:3000` in the backend.

## Database

- The backend uses SQLAlchemy and `databases` with `mysql-connector-python` according to `requirements.txt`.
- There is no automatic migration tooling included by default; add Alembic or another migration tool if you need schema evolution.

## Tests

There is an HTTP test file at `packinglist-api/tests/test_main.http` you can use with the VS Code REST Client extension to exercise endpoints. If you prefer pytest, add test runners and test cases.

## Project structure

- packinglist-api/: backend code (FastAPI)
  - app/main.py — FastAPI application setup
  - app/routers/ — API route modules
  - app/models/ — SQLAlchemy and Pydantic models
  - app/services/ — business logic
  - requirements.txt — Python dependencies

- packinglist-web/: frontend app (React + Vite)
  - src/ — React components and utilities
  - package.json — npm scripts & deps

See [packinglist-api](packinglist-api/README.md) and [packinglist-web](packinglist-web/README.md) for app-specific READMEs.

## Contributing

- Fork the repo, create a branch, and open a PR describing your changes.
- Add tests for new features and run linters on the frontend (`npm run lint`) as appropriate.

## Nice-to-haves / Next steps

- Add Alembic migrations and a `make` or npm script to create the DB.
- Add CI (GitHub Actions) to run linters and tests.
- Improve `app/core/config.py` to load from `.env` and validate settings.

## License

This project does not include a license file. Add a `LICENSE` if you want to make the project open source.
