def test_signup_success(client):
    # Arrange
    email = "newstudent@mergington.edu"
    activity = "Chess Club"
    # Act
    response = client.post(f"/activities/{activity}/signup", data={"email": email})
    # Assert
    assert response.status_code == 200
    # Confirm participant added
    get_resp = client.get("/activities")
    participants = get_resp.json()[activity]["participants"]
    assert email in participants

def test_signup_activity_not_found(client):
    # Arrange
    email = "someone@mergington.edu"
    # Act
    response = client.post("/activities/Nonexistent/signup", data={"email": email})
    # Assert
    assert response.status_code == 404
    assert "Activity not found" in response.text

def test_delete_signup_success(client):
    # Arrange
    email = "emma@mergington.edu"
    activity = "Programming Class"
    # Act
    response = client.delete(f"/activities/{activity}/signup", data={"email": email})
    # Assert
    assert response.status_code == 200
    # Confirm participant removed
    get_resp = client.get("/activities")
    participants = get_resp.json()[activity]["participants"]
    assert email not in participants
