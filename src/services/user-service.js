import { httpService } from './http.service';

export const userService = {
  getGuestUser,
  getUsers,
  createUser,
  login,
};

async function getGuestUser() {
  const guestUser = _createGuestUser();
  const loggedGuestUser = await httpService.post('auth/users', guestUser);
  return loggedGuestUser;
}

async function getUsers() {
  const users = await httpService.get('auth/users');
  return users;
}

async function createUser(user) {
  const savedUser = await httpService.post('auth/signup', user);
  console.log('user service front', savedUser);
  return savedUser;
}

async function login(user) {
  const loggedUser = await httpService.post('auth/login', user);
  return loggedUser;
}

function _createGuestUser() {
  let guestUser = {
    // _id: 'g101',
    name: 'Guest' + Math.floor(Math.random() * 100),
    email: 'randomMail@gmail.com',
    posts: [
      {
        _id: 'p001',
        title: 'Weekend Vibes',
        content: 'Finally i can smell the weekend',
        createdAt: 1648368189547,
      },
      {
        _id: 'p002',
        title: 'Vacation!!!!!!!!!!!!!!!!!!!!!',
        content: 'Me and my gf at Greece',
        createdAt: 1648368158945,
      },
    ],
  };

  return guestUser;
}
