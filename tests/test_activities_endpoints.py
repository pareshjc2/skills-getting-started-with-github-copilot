def test_root_redirects_to_static(client):
    # Arrange
    # (client fixture provided)
    # Act
    response = client.get("/", allow_redirects=False)
    # Assert
    assert response.status_code in (301, 302, 307, 308)
    assert "/static/index.html" in response.headers["location"]

def test_get_activities_returns_all(client):
    # Arrange
    # (client fixture provided)
    # Act
    response = client.get("/activities")
    # Assert
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, dict)
    assert "Chess Club" in data
    assert "participants" in data["Chess Club"]
    assert isinstance(data["Chess Club"]["participants"], list)
