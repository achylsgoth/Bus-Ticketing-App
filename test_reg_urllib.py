import urllib.request
import json
import urllib.error

url = "http://127.0.0.1:8000/auth/users/"
data = {
    "username": "testcompany3",
    "password": "testpass123",
    "email": "test3@company.com",
    "role": "company"
}
headers = {'Content-Type': 'application/json'}

req = urllib.request.Request(url, data=json.dumps(data).encode(), headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        print(f"Status: {response.status}")
        print(response.read().decode())
except urllib.error.HTTPError as e:
    print(f"Status: {e.code}")
    print(e.read().decode())
except Exception as e:
    print(f"Error: {e}")
