import requests

url = "http://127.0.0.1:8000/auth/users/"
data = {
    "username": "testcompany2",
    "password": "testpass123",
    "email": "test2@company.com",
    "role": "company"
}

response = requests.post(url, json=data)
print(f"Status Code: {response.status_code}")
print(f"Response Body: {response.text}")
