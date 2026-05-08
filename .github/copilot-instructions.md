# GitHub Copilot Instructions

## What this repository is

A small FastAPI-based example app for a fictional school activities signup system.

- Backend: `src/app.py`
- Frontend static assets: `src/static/`
- Project entrypoint: `python src/app.py`
- Dependencies: listed in `requirements.txt`

## Key files and flow

- `src/app.py`: FastAPI app, serves static files and exposes `/activities` and `/activities/{activity_name}/signup`
- `src/static/index.html`: client UI for browsing and signing up
- `src/static/app.js`: frontend behavior and API calls
- `README.md`: project overview and basic run instructions
- `.github/steps/*.md`: exercise guidance for the learning flow

## How to run it

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the app:
   ```bash
   python src/app.py
   ```
3. Open the app in a browser:
   - `http://localhost:8000/static/index.html`
   - API docs: `http://localhost:8000/docs`

## What to focus on

- Keep changes small and aligned with the tutorial-style repository.
- Preserve the simple in-memory data model and clear example behavior.
- Avoid introducing complex persistence or large architectural changes unless asked.

## Useful context for agents

- There is no test suite in this repository.
- The app is intentionally minimal and educational.
- The frontend and backend are co-located in `src/`.
- Static files are mounted under `/static` in FastAPI.

## Example prompts

- `Help me understand the purpose of src/app.py and how the frontend interacts with it.`
- `Suggest a small feature improvement that fits this tutorial-style repo.`
- `What is the fastest way to run this app and verify it works?`

## When to use this file

This file is intended for Copilot/agent guidance only: use it to understand repository structure, run commands, and stay within the scope of a small example project.
