import pytest
from fastapi.testclient import TestClient
import copy
import sys
import os

# Ensure src is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))
import app

@pytest.fixture
def client():
    return TestClient(app.app)

@pytest.fixture(autouse=True)
def clean_activities():
    # Deepcopy the original activities dict
    original = copy.deepcopy(app.activities)
    yield
    app.activities.clear()
    app.activities.update(copy.deepcopy(original))
