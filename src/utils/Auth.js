const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    throw new Error((`Ошибка ${res.status}: ${res.statusText}`))
  }
}

export const register = (password, email) => {
  return fetch('https://auth.nomoreparties.co/signup', {
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
  return fetch('https://auth.nomoreparties.co/signin', {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
  .then(res => getResponse(res))
}

export const getContent = (token) => {
  return fetch('https://auth.nomoreparties.co/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
})
  .then(res => getResponse(res))
}