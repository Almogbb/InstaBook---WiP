import { httpService } from './http.service';

// const feedEndpoint = 'feed';
// const authEndpoint = 'auth';

async function getPosts() {
  return httpService.get('feed/posts');
}

export const feedService = {
  getPosts,
};
