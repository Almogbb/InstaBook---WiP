import { httpService } from './http.service';

// const feedEndpoint = 'feed';
// const authEndpoint = 'auth';

async function getPosts() {
  return httpService.get('feed/posts');
}

async function addPost(post) {
  return httpService.post('feed/posts', post);
}

export const feedService = {
  getPosts,
  addPost,
};
