const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    throw new Error((`Ошибка ${res.status}: ${res.statusText}`))
  }
}

export const register = (password, email) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
  .then(res => getResponse(res))
}

export const authorize = (password, email) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
  .then(res => getResponse(res))
}

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
})
  .then(res => getResponse(res))
}

const baseUrl = 'https://auth.nomoreparties.co';